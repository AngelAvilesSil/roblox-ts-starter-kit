type CleanupTask = RBXScriptConnection | (() => void);

// <summary>
// The Maid class is a utility for managing cleanup tasks in a Roblox game. It allows you to register tasks, which can be either functions or RBXScriptConnections, and provides a method to clean up all registered tasks at once. This is particularly useful for managing event connections and other resources that need to be cleaned up when they are no longer needed, such as when a player leaves the game or when a component is destroyed.
// </summary> <remarks>
// This class is designed to be used in a Roblox game environment where you may have multiple tasks that need to be cleaned up at certain points in your game's lifecycle. By using the Maid class, you can ensure that all your cleanup tasks are properly managed and executed when necessary, helping to prevent memory leaks and other issues related to lingering connections or resources.
// </remarks>
export class Maid {
	private readonly tasks = new Array<CleanupTask>();

	/// Registers a cleanup task, which can be either a function or an RBXScriptConnection. The task will be stored in the Maid's internal list of tasks and can be cleaned up later using the cleanUp method. This method returns the registered task, allowing for chaining or further manipulation if needed.
	public give<T extends CleanupTask>(task: T): T {
		this.tasks.push(task);
		return task;
	}

	// Cleans up all registered tasks by either calling the function or disconnecting the RBXScriptConnection. After cleaning up, the internal list of tasks is cleared to ensure that it is ready for new tasks to be registered in the future.
	public cleanUp() {
		for (const task of this.tasks) {
			// Check if the task is a function and call it, otherwise assume it's an RBXScriptConnection and disconnect it.
			if (typeIs(task, "function")) {
				task();
			} else {
				task.Disconnect();
			}
		}

		this.tasks.clear();
	}
}
