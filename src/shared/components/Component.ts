import { Lifecycle } from "shared/types/Lifecycle";

// <summary>
// A component is a class that has an instance of a Roblox object and implements the lifecycle methods.
// </summary>
export interface Component<TInstance extends Instance = Instance> extends Lifecycle {
	readonly instance: TInstance;
}
