import { CanvasConfig, FPSConfig } from "../config/Index.js"
import { FPSObject, GhostObject, PlayerObject, WallObject } from "../models/Index.js";
import { WindowEvents, KeyEvents } from "../events/Index.js";
import StaticObject from "../models/StaticObject.js";

export default class Game {
    #fpsConfig;
    #fpsDisplay;
    #canvasConfig;
    #stateObjects;
    #staticObjects;
    #wallObjects;

    constructor(
        fpsConfig = new FPSConfig(),
        fpsDisplay = new FPSObject(),
        canvasConfig = new CanvasConfig(),
        stateObjects = [new PlayerObject(), new GhostObject()],
        staticObjects = [new StaticObject()],
        wallObjects = [new WallObject()]
    ) {
        this.#fpsConfig = fpsConfig;
        this.#fpsDisplay = fpsDisplay;
        this.#canvasConfig = canvasConfig;
        this.#stateObjects = stateObjects;
        this.#staticObjects = staticObjects;
        this.#wallObjects = wallObjects;
    }

    init() {
        let player = this.#getPlayerObject();
        let ghosts = this.#getGhostList();

        WindowEvents.resize(this.#canvasConfig.canvas);
        this.#regenerateWallObjects();

        let ghostDirectionTimer = window.setInterval(() => {
            for (let ghost of ghosts) {
                ghost.pickRandomDirection();
            }
        }, 2000);

        window.addEventListener('keydown', (event) => {
            KeyEvents.keyDown(event, player);
        });
        window.addEventListener('keyup', (event) => {
            KeyEvents.keyUp(event, player);
        });
        window.addEventListener('resize', () => {
            WindowEvents.resize(this.#canvasConfig.canvas);
            this.#regenerateWallObjects();
        });

        window.requestAnimationFrame(this.#run.bind(this));
    }

    #run(tick = 0) {
        this.#fpsConfig.tick(tick);
        if (this.#fpsConfig.shouldUpdate()) {
            this.#fpsConfig.updateThen();
            this.#update(this.#fpsConfig.secondsPassed);
            this.#draw();
        }
        if (this.#fpsConfig.shouldAnimate()) {

        }
        window.requestAnimationFrame(this.#run.bind(this));
    }

    #update(secondsPassed = 0) {
        let ghosts = this.#getGhostList();
        let player = this.#getPlayerObject();
        let walls = this.#getWallObjects();
        this.#fpsDisplay.update(secondsPassed);
        for (let ghost of ghosts) {
            let otherGhosts = ghosts.filter((g) => {
                return g.id != ghost.id
            })
            ghost.update(secondsPassed, [...otherGhosts, player, ...walls]);
        }
        player.update(secondsPassed, [...ghosts, ...walls]);
    }

    #draw() {
        this.#canvasConfig.clearCtx();
        let ghosts = this.#getGhostList();
        let player = this.#getPlayerObject();
        let walls = this.#getWallObjects();
        for (let wall of walls) {
            wall.draw(this.#canvasConfig.ctx);
        }
        for (let ghost of ghosts) {
            ghost.draw(this.#canvasConfig.ctx);
        }
        player?.draw(this.#canvasConfig.ctx);
        this.#fpsDisplay.draw(this.#canvasConfig.ctx);
    }

    #getPlayerObject() {
        for (let obj of this.#stateObjects) {
            if (obj instanceof PlayerObject) return obj;
        }
        return new PlayerObject();
    }

    #getGhostList() {
        let ghosts = [new GhostObject()];
        ghosts.pop();
        for (let obj of this.#stateObjects) {
            if (obj instanceof GhostObject) {
                ghosts.push(obj);
            }
        }
        return ghosts;
    }

    #getStaticObjects() {
        return this.#staticObjects.filter((obj) => obj instanceof StaticObject);
    }

    #getWallObjects() {
        return this.#wallObjects.filter((obj) => obj instanceof WallObject);
    }

    #regenerateWallObjects() {
        this.#wallObjects = WallObject.generateWalls(this.#canvasConfig);
    }
}