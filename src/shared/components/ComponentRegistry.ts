import { Component } from "./Component";

// <summary>
// A component registry is a class that manages the lifecycle of components.
// It is responsible for adding, updating, and destroying components.
// </summary>
export class ComponentRegistry {
	private readonly components = new Array<Component>();

	// adds a component to the registry and calls its onInit and onStart methods
	public add(component: Component) {
		this.components.push(component);
		component.onInit?.();
		component.onStart?.();

		return component;
	}

	// updates all components in the registry by calling their onUpdate method with the given delta time
	public update(dt: number) {
		for (const component of this.components) {
			component.onUpdate?.(dt);
		}
	}

	// destroys all components in the registry by calling their onDestroy method and clearing the registry
	public destroy() {
		for (const component of this.components) {
			component.onDestroy?.();
		}

		this.components.clear();
	}
}
