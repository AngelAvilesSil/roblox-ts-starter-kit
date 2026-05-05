export type RoundPhase = "Waiting" | "Starting" | "Active" | "Finished";

// <summary>
// The RoundState interface defines the structure for representing the state of a round in a Roblox game. It includes properties such as phase, which indicates the current phase of the round (e.g., Waiting, Starting, Active, Finished), and timeRemaining, which represents the amount of time left in the current phase. This interface can be used to manage and track the state of rounds in your game, allowing for consistent handling of round logic and transitions.
// </summary> <remarks>
// This interface is designed to be used in a Roblox game environment where you may have multiple rounds or stages that players go through. By using the RoundState interface, you can ensure that your code has a consistent structure for managing round information and can easily access the current phase and remaining time for each round.
// </remarks>
export interface RoundState {
	phase: RoundPhase;
	timeRemaining: number;
}
