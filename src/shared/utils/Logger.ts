/// <summary>
/// The Logger class provides a simple logging utility for Roblox games. It allows you to log informational messages, warnings, and errors with a consistent format that includes the context of the log message. This can help you track the flow of your game and identify issues more easily during development and debugging.
/// </summary> <remarks>
/// The Logger class is designed to be used in both client and server environments in a Roblox game. You can create instances of the Logger class with different contexts (e.g., "ClientRuntime", "ServerRuntime", "PlayerController") to categorize your log messages and make it easier to filter them when reviewing logs. The methods provided by the Logger class (info, warn, error) will print messages to the output console with appropriate formatting for each log level.
/// </remarks>
export class Logger {
	public constructor(private readonly context: string) {}

	public info(message: string) {
		print(`[INFO] [${this.context}] ${message}`);
	}

	public warn(message: string) {
		warn(`[WARN] [${this.context}] ${message}`);
	}

	public error(message: string) {
		error(`[ERROR] [${this.context}] ${message}`);
	}
}
