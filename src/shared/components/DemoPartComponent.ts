import { Component } from "shared/components/Component";
import { Logger } from "shared/utils/Logger";

/// <summary>
/// The DemoPartComponent class is a simple implementation of the Component interface, designed to demonstrate how to create a component in a Roblox game. It includes basic lifecycle methods (onInit, onStart, and onUpdate) that log messages and manipulate a BasePart instance. This class can be used as a template for creating more complex components that perform specific tasks in your game.
/// </summary> <remarks>
/// This class is intended to be used in a Roblox game environment, where you can create various components that perform different tasks, such as handling player interactions, managing game state, or processing game logic. By using the DemoPartComponent as a starting point, you can easily create your own components with customized behavior while maintaining a consistent structure and logging format.
/// </remarks>
export class DemoPartComponent implements Component<BasePart> {
	private readonly logger = new Logger("DemoPartComponent");

	public constructor(public readonly instance: BasePart) {}

	// The onInit method is called when the component is initialized. In this implementation, it simply logs a message indicating that the component has been attached to the instance. You can add any setup logic or initialization code that your component requires within this method.
	public onInit() {
		this.logger.info(`Attached to ${this.instance.Name}.`);
	}

	// The onStart method is called when the component is started. In this implementation, it sets the instance to be anchored and gives it a name. You can modify this method to include any logic that should occur when the component starts, such as setting up event listeners or initializing properties.
	public onStart() {
		this.instance.Anchored = true;
		this.instance.Name = "DemoComponentPart";
	}

	// The onUpdate method is called every frame with the delta time (dt) since the last update. In this implementation, it rotates the instance around the Y-axis at a rate of 90 degrees per second. You can add any logic that needs to be executed every frame within this method, such as updating properties, processing interactions, or managing timers.
	public onUpdate(dt: number) {
		this.instance.CFrame = this.instance.CFrame.mul(CFrame.Angles(0, math.rad(90) * dt, 0));
	}
}
