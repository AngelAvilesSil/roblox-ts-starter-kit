import { Lifecycle } from "shared/types/Lifecycle";

// The ServerService interface extends the Lifecycle interface, indicating that any class implementing ServerService must also implement the lifecycle methods defined in Lifecycle. Additionally, it includes a readonly property Name, which is a string that represents the name of the service. This structure allows for organized management of server-side services with defined lifecycle behaviors.
export interface ServerService extends Lifecycle {
	readonly name: string;
}
