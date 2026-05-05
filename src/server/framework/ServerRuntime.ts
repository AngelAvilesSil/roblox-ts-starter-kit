import { RunService } from "@rbxts/services";
import { ServerService } from "./ServerService";

/// <summary>
/// The ServerRuntime class is responsible for managing the lifecycle of server services in a Roblox game. It allows you to register multiple services, which are instances of the ServerService class, and handles their initialization, starting, and updating. The runtime will call the appropriate lifecycle methods (onInit, onStart, onUpdate) on each registered service at the right times during the game's execution.
/// </summary> <remarks>
/// This class is designed to be used in a Roblox game server environment, where you can create various services that perform different tasks, such as handling player data, managing game state, or processing game logic. By using the ServerRuntime, you can ensure that all your services are properly initialized and updated in a consistent manner.
/// </remarks>
export class ServerRuntime {
	private readonly services = new Array<ServerService>();

	register(...services: ServerService[]) {
		for (const service of services) {
			this.services.push(service);
		}
	}

	start() {
		for (const service of this.services) {
			service.onInit?.();
		}

		for (const service of this.services) {
			service.onStart?.();
		}

		RunService.Heartbeat.Connect((dt) => {
			for (const service of this.services) {
				service.onUpdate?.(dt);
			}
		});
	}
}
