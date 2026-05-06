import { RoundState } from "../types/RoundTypes";

// <summary>
// The ClientToServerEvents and ServerToClientEvents interfaces define the structure for events that can be sent between the client and server in a Roblox game. The ClientToServerEvents interface includes events that the client can send to the server, such as requesting to join a round or requesting to score a point. The ServerToClientEvents interface includes events that the server can send to the client, such as notifying about changes in round state or score changes. These interfaces help ensure that the communication between the client and server is consistent and well-structured.
// </summary> <remarks>
// These interfaces are designed to be used in a Roblox game environment where you need to manage communication between the client and server. By defining these event structures, you can ensure that your code has a clear and consistent way of handling events and data exchange between the client and server components of your game.
// </remarks>
export interface ClientToServerEvents {
	RequestJoinRound: [];
	RequestScorePoint: [];
}

// <summary>
// The ServerToClientEvents interface defines the structure for events that the server can send to the client in a Roblox game. It includes events such as RoundStateChanged, which notifies the client about changes in the round state, and ScoreChanged, which informs the client about changes in player scores. Each event is associated with specific data that is sent along with the event, allowing the client to update its state accordingly.
// </summary> <remarks>
// This interface is designed to be used in a Roblox game environment where the server needs to communicate important information to the client, such as updates on the game state or player scores. By defining these events and their associated data structures, you can ensure that your server-to-client communication is organized and consistent throughout your game.
// </remarks>
export interface ServerToClientEvents {
	RoundStateChanged: [state: RoundState];
	ScoreChanged: [userId: number, score: number];
}
