// <summary>
// The PlayerTypes interface defines the structure for player-related data in a Roblox game. It includes properties such as userId, displayName, score, and isInRound, which can be used to store and manage information about players in the game. This interface can be implemented by classes or used as a type for variables that need to represent player data.
// </summary> <remarks>
// This interface is designed to be used in a Roblox game environment, where you may need to manage player information for various purposes, such as tracking scores, displaying player names, or determining if a player is currently active in a round. By using the PlayerTypes interface, you can ensure that your code has a consistent structure for handling player data throughout your game.
// </remarks>
export interface PlayerTypes {
	userId: number;
	displayName: string;
	score: number;
	isInRound: boolean;
}
