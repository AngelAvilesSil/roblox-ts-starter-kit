import { Lifecycle } from "shared/types/Lifecycle";

// The ClientController interface extends the Lifecycle interface, indicating that any class implementing ClientController must also implement the lifecycle methods defined in the Lifecycle interface. Additionally, it includes a readonly property called Name, which is a string that represents the name of the controller. This interface is likely used to define the structure of client-side controllers in an application, ensuring that they have a consistent lifecycle and a way to identify themselves through the Name property.
export interface ClientController extends Lifecycle {
	readonly Name: string;
}
