import { ReplicatedStorage } from "@rbxts/services";
import { NetworkConstants } from "shared/constants/NetworkConstants";
import { RoundState } from "shared/types/RoundTypes";
import { ClientToServerEvents, ServerToClientEvents } from "./NetworkTypes";

type ClientToServerEventName = keyof ClientToServerEvents;
type ServerToClientEventName = keyof ServerToClientEvents;

/// <summary>A utility for handling RemoteEvents in a type-safe way.
/// </summary> <remarks>
/// This class assumes that all RemoteEvents are stored in a single folder in ReplicatedStorage, and that the name of each RemoteEvent matches the event name used in the type definitions.
/// </remarks>
class NetworkServer {
	private folder?: Folder;

	// Listen for an event from the client. Use this for events that the client will fire to the server, such as player actions.
	public initialize() {
		this.getOrCreateRemote(NetworkConstants.ClientToServer.RequestJoinRound);
		this.getOrCreateRemote(NetworkConstants.ClientToServer.RequestScorePoint);
		this.getOrCreateRemote(NetworkConstants.ServerToClient.RoundStateChanged);
		this.getOrCreateRemote(NetworkConstants.ServerToClient.ScoreChanged);
	}

	public on(eventName: ClientToServerEventName, handler: (player: Player) => void) {
		const remote = this.getOrCreateRemote(eventName);
		return remote.OnServerEvent.Connect((player) => {
			handler(player);
		});
	}

	// Fire an event to a specific client. Use this for events that are only relevant to a single client, as it is more efficient than firing to all clients.
	public fire(
		player: Player,
		eventName: "RoundStateChanged",
		state: ServerToClientEvents["RoundStateChanged"][0],
	): void;
	public fire(player: Player, eventName: "ScoreChanged", userId: number, score: number): void;
	public fire(player: Player, eventName: ServerToClientEventName, firstArg: unknown, secondArg?: unknown) {
		const remote = this.getOrCreateRemote(eventName);

		if (eventName === "RoundStateChanged") {
			remote.FireClient(player, firstArg);
			return;
		}

		if (eventName === "ScoreChanged") {
			remote.FireClient(player, firstArg, secondArg);
			return;
		}
	}

	// Fire an event to all clients. Only use this for events that are truly global, as it can be expensive if there are many clients.
	public fireAll(eventName: "RoundStateChanged", state: ServerToClientEvents["RoundStateChanged"][0]): void;
	public fireAll(eventName: "ScoreChanged", userId: number, score: number): void;
	public fireAll(eventName: ServerToClientEventName, firstArg: unknown, secondArg?: unknown) {
		const remote = this.getOrCreateRemote(eventName);

		if (eventName === "RoundStateChanged") {
			remote.FireAllClients(firstArg);
			return;
		}

		if (eventName === "ScoreChanged") {
			remote.FireAllClients(firstArg, secondArg);
			return;
		}
	}

	// Get an existing RemoteEvent or create it if it doesn't exist. This is used internally to ensure that the RemoteEvents are always available when needed.
	private getOrCreateFolder() {
		if (this.folder !== undefined) {
			return this.folder;
		}

		const existing = ReplicatedStorage.FindFirstChild(NetworkConstants.FolderName);

		if (existing !== undefined) {
			assert(existing.IsA("Folder"), `${NetworkConstants.FolderName} must be a Folder.`);
			this.folder = existing;
			return this.folder;
		}

		const folder = new Instance("Folder");
		folder.Name = NetworkConstants.FolderName;
		folder.Parent = ReplicatedStorage;

		this.folder = folder;
		return this.folder;
	}

	// Get an existing RemoteEvent or create it if it doesn't exist. This is used internally to ensure that the RemoteEvents are always available when needed.
	private getOrCreateRemote(eventName: string) {
		const folder = this.getOrCreateFolder();
		const existing = folder.FindFirstChild(eventName);

		if (existing !== undefined) {
			assert(existing.IsA("RemoteEvent"), `${eventName} must be a RemoteEvent.`);
			return existing;
		}

		const remote = new Instance("RemoteEvent");
		remote.Name = eventName;
		remote.Parent = folder;

		return remote;
	}
}

/// <summary>A utility for handling RemoteEvents in a type-safe way.
/// </summary> <remarks>
/// This class assumes that all RemoteEvents are stored in a single folder in ReplicatedStorage, and that the name of each RemoteEvent matches the event name used in the type definitions.
/// </remarks>
class NetworkClient {
	private folder?: Folder;

	// Fire an event to the server. Use this for events that the client will fire to the server, such as player actions.
	public fire(eventName: ClientToServerEventName) {
		const remote = this.getRemote(eventName);
		remote.FireServer();
	}

	// Listen for an event from the server. Use this for events that the server will fire to the client, such as updates to the game state.
	public on(eventName: "RoundStateChanged", handler: (state: RoundState) => void): RBXScriptConnection;
	public on(eventName: "ScoreChanged", handler: (userId: number, score: number) => void): RBXScriptConnection;
	public on(
		eventName: ServerToClientEventName,
		handler: ((state: RoundState) => void) | ((userId: number, score: number) => void),
	) {
		const remote = this.getRemote(eventName);

		if (eventName === "RoundStateChanged") {
			const roundHandler = handler as (state: RoundState) => void;

			return remote.OnClientEvent.Connect((state) => {
				roundHandler(state as RoundState);
			});
		}

		const scoreHandler = handler as (userId: number, score: number) => void;

		return remote.OnClientEvent.Connect((userId, score) => {
			scoreHandler(userId as number, score as number);
		});
	}

	// Listen for an event from the server only once. Use this for events that the server will fire to the client, but the client only needs to respond to it once, such as an initial game state update.
	private getFolder() {
		if (this.folder !== undefined) {
			return this.folder;
		}

		const folder = ReplicatedStorage.WaitForChild(NetworkConstants.FolderName);
		assert(folder.IsA("Folder"), `${NetworkConstants.FolderName} must be a Folder.`);

		this.folder = folder;
		return this.folder;
	}

	// Get an existing RemoteEvent. This is used internally to ensure that the RemoteEvents are always available when needed. If the RemoteEvent doesn't exist, this will throw an error, as it indicates a mismatch between the type definitions and the actual RemoteEvents in the game.
	private getRemote(eventName: string) {
		const folder = this.getFolder();
		const remote = folder.WaitForChild(eventName);

		assert(remote.IsA("RemoteEvent"), `${eventName} must be a RemoteEvent.`);

		return remote;
	}
}

// A singleton instance of the NetworkServer and NetworkClient classes, which can be imported and used throughout the game to handle RemoteEvents in a type-safe way.
export const Network = {
	server: new NetworkServer(),
	client: new NetworkClient(),
};
