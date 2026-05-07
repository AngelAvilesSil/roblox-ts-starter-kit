import { ClientController } from "client/framework/ClientController";
import { Network } from "shared/networking/Network";
import { RoundState } from "shared/types/RoundTypes";
import { Logger } from "shared/utils/Logger";

/// <summary>
/// The DemoClientController class is a simple implementation of the ClientController interface, designed to demonstrate how to create a client controller in a Roblox game. It includes basic lifecycle methods (onInit and onStart) that log messages to indicate when the controller is initializing and starting. This class can be used as a template for creating more complex client controllers that perform specific tasks in your game.
/// </summary> <remarks>
/// This class is intended to be used in a Roblox game client environment, where you can create various controllers that perform different tasks, such as handling user input, managing UI, or processing game logic. By using the DemoClientController as a starting point, you can easily create your own client controllers with customized behavior while maintaining a consistent structure and logging format.
/// </remarks>
export class DemoClientController implements ClientController {
	public readonly Name = "DemoClientController";

	private readonly logger = new Logger(this.Name);

	// The onInit method is called when the controller is initialized. In this implementation, it logs a message indicating that the controller has been initialized and sets up event listeners for server events "RoundStateChanged" and "ScoreChanged". When these events are received from the server, it logs the new round state and score information. You can modify this method to include any logic that should occur when the controller initializes, such as setting up additional event listeners or initializing client-side state.
	public onInit() {
		this.logger.info("Initialized");

		Network.client.on("RoundStateChanged", (state: RoundState) => {
			this.logger.info(`Round state changed: ${state.phase} (${state.timeRemaining}s remaining)`);
		});

		Network.client.on("ScoreChanged", (userId, score) => {
			this.logger.info(`Score changed: userId=${userId}, score=${score}`);
		});
	}

	// The onStart method is called when the controller is started. In this implementation, it logs a message indicating that the controller has started and sends a request to the server to join the round using the Network utility. You can modify this method to include any logic that should occur when the controller starts, such as sending additional requests to the server or initializing client-side state based on user input or other factors.
	public onStart() {
		this.logger.info("Started");
		this.logger.info("Requesting to join round");

		Network.client.fire("RequestJoinRound");
	}
}
