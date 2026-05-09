import { Workspace } from "@rbxts/services";
import { ServerService } from "server/framework/ServerService";
import { ComponentRegistry } from "shared/components/ComponentRegistry";
import { DemoPartComponent } from "shared/components/DemoPartComponent";
import { Network } from "shared/networking/Network";
import { RoundState } from "shared/types/RoundTypes";
import { Logger } from "shared/utils/Logger";

/// <summary>
/// The DemoServerService class is a simple implementation of the ServerService interface, designed to demonstrate how to create a server service in a Roblox game. It includes basic lifecycle methods (onInit and onStart) that log messages to indicate when the service is initializing and starting. This class can be used as a template for creating more complex server services that perform specific tasks in your game.
/// </summary> <remarks>
/// This class is intended to be used in a Roblox game server environment, where you can create various services that perform different tasks, such as handling player data, managing game state, or processing game logic. By using the DemoServerService as a starting point, you can easily create your own server services with customized behavior while maintaining a consistent structure and logging format.
/// </remarks>
export class DemoServerService implements ServerService {
	public readonly name = "DemoServerService";

	private readonly logger = new Logger(this.name);
	private readonly components = new ComponentRegistry();

	// The onInit method is called when the service is initialized. In this implementation, it simply logs a message indicating that the service has been initialized. You can add any setup logic or initialization code that your service requires within this method.
	public onInit() {
		Network.server.initialize();
		this.logger.info("Initialized.");
	}

	// The onStart method is called when the service is started. In this implementation, it logs a message indicating that the service has started and sets up an event listener for a client event called "RequestJoinRound". When a player requests to join the round, it logs the player's name and sends them the current round state and their score using the Network utility. You can modify this method to include any logic that should occur when the service starts, such as setting up additional event listeners or initializing game state.
	public onStart() {
		this.logger.info("Started.");
		this.createDemoPart();

		Network.server.on("RequestJoinRound", (player) => {
			this.logger.info(`${player.Name} requested to join the round.`);

			const roundState: RoundState = {
				phase: "Waiting",
				timeRemaining: 10,
			};

			Network.server.fire(player, "RoundStateChanged", roundState);
			Network.server.fire(player, "ScoreChanged", player.UserId, 0);
		});
	}

	// The onUpdate method is called every frame with the delta time (dt) since the last update. In this implementation, it simply updates all components in the ComponentRegistry by calling their onUpdate method with the given delta time. You can add any logic that needs to be executed every frame within this method, such as updating game state, processing player actions, or managing timers.
	public onUpdate(dt: number) {
		this.components.update(dt);
	}

	// The onDestroy method is called when the service is destroyed. In this implementation, it destroys all components in the ComponentRegistry by calling their onDestroy method and clearing the registry. You can add any cleanup logic or resource management code that your service requires within this method, such as disconnecting event listeners or freeing up resources.
	public onDestroy() {
		this.components.destroy();
	}

	// The createDemoPart method is a helper function that creates a simple part in the Roblox world and adds a DemoPartComponent to the ComponentRegistry. This method is called in the onStart method to demonstrate how to create and manage components within the service. You can modify this method to create different types of parts or components as needed for your game.
	private createDemoPart() {
		const part = new Instance("Part");
		part.Name = "DemoComponentPart";
		part.Size = new Vector3(4, 1, 4);
		part.Position = new Vector3(0, 5, 0);
		part.Anchored = true;
		part.Parent = Workspace;

		this.components.add(new DemoPartComponent(part));
	}
}
