import { ClientRuntime } from "./framework/ClientRuntime";
import { DemoClientController } from "./controllers/DemoClientController";

const runtime = new ClientRuntime();

runtime.register(new DemoClientController());

runtime.start();
