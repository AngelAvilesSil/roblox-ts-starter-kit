// <summary>
// The NetworkConstants object defines a set of constant values for network communication in a Roblox game. It includes the name of the folder where remote events and functions are stored (FolderName) and two nested objects (ClientToServer and ServerToClient) that contain string constants representing the names of remote events or functions for communication between the client and server. These constants can be used throughout the game's code to ensure consistency when referencing remote events and functions, reducing the likelihood of typos and making it easier to manage network communication.
// </summary> <remarks>
// This object is designed to be used in a Roblox game environment where you need to establish communication between the client and server using remote events and functions. By defining these constants in a centralized location, you can maintain a clear and organized structure for your network communication, making it easier to understand and manage as your game grows in complexity.
// </remarks>
export const NetworkConstants = {
	FolderName: "GameRemotes",

	ClientToServer: {
		RequestJoinRound: "RequestJoinRound",
		RequestScorePoint: "RequestScorePoint",
	},

	ServerToClient: {
		RoundStateChanged: "RoundStateChanged",
		ScoreChanged: "ScoreChanged",
	},
} as const;
