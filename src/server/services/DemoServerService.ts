import { ServerService } from "server/framework/ServerService";
import { Logger } from "shared/utils/Logger";

/// <summary>
/// The DemoServerService class is a simple implementation of the ServerService interface, designed to demonstrate how to create a server service in a Roblox game. It includes basic lifecycle methods (onInit and onStart) that log messages to indicate when the service is initializing and starting. This class can be used as a template for creating more complex server services that perform specific tasks in your game.
/// </summary> <remarks>
/// This class is intended to be used in a Roblox game server environment, where you can create various services that perform different tasks, such as handling player data, managing game state, or processing game logic. By using the DemoServerService as a starting point, you can easily create your own server services with customized behavior while maintaining a consistent structure and logging format.
/// </remarks>
export class DemoServerService implements ServerService {
	public readonly Name = "DemoServerService";

	private readonly logger = new Logger(this.Name);

	onInit() {
		this.logger.info("Initializing DemoServerService...");
	}

	onStart() {
		this.logger.info("Starting DemoServerService...");
	}
}
