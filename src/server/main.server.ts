import { ServerRuntime } from "./framework/ServerRuntime";
import { DemoServerService } from "./services/DemoServerService";

const runtime = new ServerRuntime();

runtime.register(new DemoServerService());

runtime.start();
