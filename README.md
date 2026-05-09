# roblox-ts-starter-kit

A reusable Roblox TypeScript starter kit built with `roblox-ts` to accelerate small multiplayer game development while keeping the codebase structured, maintainable, and easy to extend.

This project is intentionally a **starter kit**, not a full framework. It provides a practical foundation for building Roblox games with TypeScript, simple lifecycle patterns, server/client separation, typed networking helpers, reusable services/controllers/components, cleanup utilities, and CI validation through GitHub Actions.

The goal is to help ship small Roblox games faster while demonstrating software engineering practices such as architecture, tooling, reusable structure, TypeScript-first development, multiplayer-system thinking, and build validation.

## Why this project exists

I built this starter kit because I want to create small Roblox games using TypeScript while keeping my software engineering skills active and portfolio-ready.

I have experience with Unity/C# simulations, so this project includes a small Unity-inspired lifecycle style:

```ts
onInit?(): void;
onStart?(): void;
onUpdate?(dt: number): void;
onDestroy?(): void;
```

However, this project does **not** try to recreate Unity inside Roblox. The architecture is designed to stay Roblox-native by respecting:

- server/client separation
- server-authoritative gameplay
- `RemoteEvent` communication
- `ReplicatedStorage`
- `ServerScriptService`
- `StarterPlayerScripts`
- Roblox services
- multiplayer state flow
- client-side controllers for UI/input/presentation

## Professional summary

This project demonstrates how I approach reusable software architecture in a practical way:

> I built a reusable Roblox TypeScript starter kit to accelerate multiplayer game development using `roblox-ts`. The starter kit provides lifecycle patterns, server/client structure, typed networking helpers, reusable services/controllers/components, cleanup utilities, and CI validation through GitHub Actions.

Although the project is built for Roblox, the engineering ideas are relevant to broader software engineering roles:

- TypeScript architecture
- modular code organization
- client/server boundaries
- event-driven communication
- reusable abstractions
- lifecycle management
- CI validation
- build tooling
- scope control
- maintainable project structure

## Goals

- Provide a TypeScript-first Roblox project structure.
- Keep server and client code clearly separated.
- Support server-authoritative multiplayer gameplay patterns.
- Use a small lifecycle style that feels familiar to Unity developers without copying Unity.
- Provide simple server services, client controllers, reusable components, typed networking, logging, and cleanup utilities.
- Make it easier to start multiple small Roblox games without rebuilding the same structure every time.
- Keep the architecture small enough to understand, explain, and modify quickly.
- Demonstrate software engineering discipline without over-engineering.

## What this is not

This starter kit is not:

- a full game framework
- a Unity clone
- an ECS
- an advanced dependency injection system
- a plugin framework
- a custom physics framework
- a custom animation framework
- a generic UI framework
- a matchmaking system
- a save-data migration framework
- a monetization abstraction
- an analytics dashboard
- an admin panel
- an npm package library

Game-specific systems should be built inside each game first. Only move code back into the starter kit after it proves useful across multiple games.

## Project structure

```txt
src/
  client/
    controllers/
      DemoClientController.ts
    framework/
      ClientController.ts
      ClientRuntime.ts
    main.client.ts

  server/
    services/
      DemoServerService.ts
    framework/
      ServerService.ts
      ServerRuntime.ts
    main.server.ts

  shared/
    components/
      Component.ts
      ComponentRegistry.ts
      DemoPartComponent.ts
    constants/
      GameConstants.ts
      NetworkConstants.ts
    networking/
      Network.ts
      NetworkTypes.ts
    types/
      Lifecycle.ts
      PlayerTypes.ts
      RoundTypes.ts
    utils/
      Logger.ts
      Maid.ts
```

## Architecture overview

The starter kit uses a small set of practical abstractions.

### Server services

Server services own trusted gameplay logic.

Examples of responsibilities:

- player state
- scoring
- round flow
- server-side validation
- RemoteEvent handling
- gameplay rules

Server services implement the `ServerService` interface and can use lifecycle methods such as `onInit`, `onStart`, `onUpdate`, and `onDestroy`.

Example:

```ts
export class DemoServerService implements ServerService {
	public readonly name = "DemoServerService";

	public onInit() {
		// Setup server-side dependencies.
	}

	public onStart() {
		// Start server-side behavior.
	}

	public onUpdate(dt: number) {
		// Optional frame-based server logic.
	}
}
```

### Client controllers

Client controllers own local client behavior.

Examples of responsibilities:

- UI behavior
- player input
- camera logic
- local effects
- displaying replicated state
- listening for server updates

Client controllers implement the `ClientController` interface and use the same lightweight lifecycle style.

### Components

Components are reusable behaviors attached to Roblox `Instance`s.

This is intentionally simple. It is not an ECS.

The demo includes a `DemoPartComponent` that attaches to a Roblox `Part` and rotates it during `onUpdate`.

This pattern is useful for small reusable behaviors while keeping the code easy to understand.

### Typed networking

The starter kit includes a basic typed wrapper around `RemoteEvent`.

Current demo flow:

```txt
Client fires RequestJoinRound
Server receives RequestJoinRound
Server sends RoundStateChanged
Server sends ScoreChanged
Client receives both updates
```

This gives the project a simple event boundary between client and server without adding an oversized networking framework.

Advanced features such as middleware, retries, schemas, RPC, matchmaking, and permission systems are intentionally excluded from Phase 1.

### Cleanup utility

The `Maid` utility tracks cleanup tasks such as event connections and callbacks.

This helps prevent leaked event connections and keeps service/controller/component lifecycles easier to manage.

### Logger

The `Logger` utility provides a small consistent logging format for services, controllers, and components.

Example output:

```txt
[INFO] [DemoServerService] Started.
[INFO] [DemoClientController] Requesting to join round.
[INFO] [DemoPartComponent] Attached to DemoComponentPart.
```

## Demo included

The current demo proves the starter kit works end-to-end:

- server runtime starts server services
- client runtime starts client controllers
- server initializes RemoteEvents
- client sends a `RequestJoinRound` event
- server receives the request
- server sends round and score updates back to the client
- client receives and logs the updates
- server creates a demo Roblox part
- `DemoPartComponent` attaches to the part
- the part rotates using the `onUpdate` lifecycle

This demo is intentionally small. Its purpose is to validate the architecture, not to act as a full game.

## Local development

Install dependencies:

```bash
npm install
```

Compile once:

```bash
npm run build
```

Watch for changes:

```bash
npm run watch
```

Run validation:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Format files:

```bash
npm run format
```

## Rojo setup

This project uses Rojo to sync the compiled `out` folder into Roblox Studio.

The project has been tested locally with:

```txt
Rojo CLI: 7.6.1
Roblox Studio Rojo plugin: 7.6.1
```

Example command:

```powershell
rojo.exe serve default.project.json
```

Then connect from the Rojo plugin inside Roblox Studio.

## GitHub Actions

The CI workflow validates the project by running:

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run build
```

The workflow intentionally does not publish, deploy, release, or package anything in Phase 1.

The purpose of CI in this starter kit is to confirm that the project stays healthy as it evolves.

## Creating a new game from this starter kit

There are two practical reuse strategies.

### Option A: Use this repository as a GitHub template

Use this when you want the fastest setup for a new game.

1. Mark this repository as a GitHub template.
2. Create a new repository from the template.
3. Rename the project in `default.project.json`.
4. Start building the game.

This is the simplest option for most small games.

### Option B: Clone with an upstream remote

Use this when you want a game repository to pull future starter-kit updates.

```bash
git clone git@github.com:AngelAvilesSil/roblox-ts-starter-kit.git my-new-roblox-game
cd my-new-roblox-game

git remote rename origin upstream
git remote add origin git@github.com:AngelAvilesSil/my-new-roblox-game.git

git push -u origin main
```

Later, pull starter-kit updates with:

```bash
git fetch upstream
git merge upstream/main
```

Use this only when future starter-kit syncing is worth the extra Git complexity.

## Phase 1 scope

Phase 1 includes:

- basic `roblox-ts` project structure
- shared types/constants folder
- server service lifecycle
- client controller lifecycle
- simple component pattern
- basic typed networking wrapper around `RemoteEvent`
- basic logger
- cleanup/destroy utility
- simple demo showing the architecture
- GitHub Actions CI workflow
- README explaining usage and extension strategy

Phase 1 intentionally excludes:

- custom physics framework
- advanced dependency injection
- full plugin system
- complex ECS
- custom animation framework
- save-data migration framework
- matchmaking
- full inventory database
- monetization abstraction
- analytics dashboard
- admin panel
- generic UI framework
- deep inheritance hierarchy
- npm packaging

## Design principles

This starter kit follows a few practical design principles:

- Prefer simple composition over deep inheritance.
- Keep abstractions small and easy to explain.
- Respect Roblox-native patterns.
- Keep server gameplay authority on the server.
- Use TypeScript types to make client/server contracts clearer.
- Validate changes with formatting, linting, typechecking, and compilation.
- Build only what is needed to ship small games.
- Move reusable code into the starter kit only after it proves useful.

## Portfolio value

This project is useful as a software engineering portfolio project because it demonstrates more than Roblox scripting.

It shows:

- TypeScript-first development
- modular architecture
- event-driven client/server communication
- multiplayer system structure
- lifecycle design
- reusable utilities
- CI validation
- practical tooling
- scope discipline
- ability to build reusable developer foundations

The goal is not to endlessly polish the starter kit. The goal is to use it as a clean foundation for shipping real playable Roblox games.
