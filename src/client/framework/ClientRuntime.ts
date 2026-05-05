import { RunService } from "@rbxts/services";
import { ClientController } from "./ClientController";

/// <summary>
/// The ClientRuntime class is responsible for managing the lifecycle of client controllers in a Roblox game. It allows you to register multiple controllers, which are instances of the ClientController interface, and handles their initialization, starting, and updating. The runtime will call the appropriate lifecycle methods (onInit, onStart, onUpdate) on each registered controller at the right times during the game's execution.
/// </summary> <remarks>
/// This class is designed to be used in a Roblox game client environment, where you can create various controllers that perform different tasks, such as handling user input, managing UI, or processing game logic. By using the ClientRuntime, you can ensure that all your controllers are properly initialized and updated in a consistent manner.
/// </remarks>
export class ClientRuntime {
	private readonly controllers = new Array<ClientController>();

	register(...controllers: ClientController[]) {
		for (const controller of controllers) {
			this.controllers.push(controller);
		}
	}

	start() {
		for (const controller of this.controllers) {
			controller.onInit?.();
		}

		for (const controller of this.controllers) {
			controller.onStart?.();
		}

		RunService.Heartbeat.Connect((dt) => {
			for (const controller of this.controllers) {
				controller.onUpdate?.(dt);
			}
		});
	}
}
