import { ClientController } from "client/framework/ClientController";
import { Logger } from "shared/utils/Logger";

/// <summary>
/// The DemoClientController class is a simple implementation of the ClientController interface, designed to demonstrate how to create a client controller in a Roblox game. It includes basic lifecycle methods (onInit and onStart) that log messages to indicate when the controller is initializing and starting. This class can be used as a template for creating more complex client controllers that perform specific tasks in your game.
/// </summary> <remarks>
/// This class is intended to be used in a Roblox game client environment, where you can create various controllers that perform different tasks, such as handling user input, managing UI, or processing game logic. By using the DemoClientController as a starting point, you can easily create your own client controllers with customized behavior while maintaining a consistent structure and logging format.
/// </remarks>
export class DemoClientController implements ClientController {
	public readonly Name = "DemoClientController";

	private readonly logger = new Logger(this.Name);

	onInit() {
		this.logger.info("Initializing DemoClientController...");
	}

	onStart() {
		this.logger.info("Starting DemoClientController...");
	}
}
