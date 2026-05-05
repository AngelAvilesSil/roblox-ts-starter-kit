// A Unity-like lifecycle interface for components in a game engine or application framework. This interface defines optional methods that can be implemented by components to hook into different stages of their lifecycle, such as initialization, starting, updating, and destruction. The methods are designed to be called by the framework at appropriate times during the component's lifecycle.
export interface Lifecycle {
	OnInit?(): void;
	OnStart?(): void;
	OnUpdate?(dt: number): void;
	onDestroy?(): void;
}
