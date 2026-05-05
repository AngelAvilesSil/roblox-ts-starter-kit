/// <summary>
/// The Lifecycle interface defines the structure for objects that have a lifecycle in a Roblox game. It includes optional methods for initialization (onInit), starting (onStart), updating (onUpdate), and destruction (onDestroy). Classes that implement this interface can define their own behavior for each of these lifecycle stages, allowing for consistent management of game components.
/// </summary> <remarks>
/// This interface is designed to be implemented by various classes in a Roblox game, such as controllers, services, or other components that need to perform specific actions during different stages of their lifecycle. By implementing the Lifecycle interface, you can ensure that your classes have a standardized way of handling initialization, updates, and cleanup.
/// </remarks>
export interface Lifecycle {
	onInit?(): void;
	onStart?(): void;
	onUpdate?(dt: number): void;
	onDestroy?(): void;
}
