import { CanvasConfig, FPSConfig } from "../config/Index.js"
import { FPSObject, GhostObject, PlayerObject } from "../models/Index.js";
import { WindowEvents, KeyEvents } from "../events/Index.js";

export default class Game {
    #fpsConfig;
    #fpsDisplay;
    #canvasConfig;
    #stateObjects;

    constructor(
        fpsConfig = new FPSConfig(),
        fpsDisplay = new FPSObject(),
        canvasConfig = new CanvasConfig(),
        stateObjects = [new PlayerObject(), new GhostObject()]
    ) {
        this.#fpsConfig = fpsConfig;
        this.#fpsDisplay = fpsDisplay;
        this.#canvasConfig = canvasConfig;
        this.#stateObjects = stateObjects;
    }

    init() {
        let player = this.#getPlayerObject();

        WindowEvents.resize(this.#canvasConfig.canvas);

        window.addEventListener('keydown', (event) => {
            KeyEvents.keyDown(event, player);
        });
        window.addEventListener('keyup', (event) => {
            KeyEvents.keyUp(event, player);
        });
        window.addEventListener('resize', () => {
            WindowEvents.resize(this.#canvasConfig.canvas);
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
        window.requestAnimationFrame(this.#run.bind(this));
    }

    #update(secondsPassed = 0) {
        this.#fpsDisplay.update(secondsPassed);
        let ghosts = this.#getGhostList();
        let player = this.#getPlayerObject();
        for (let ghost of ghosts) {
            ghost.update(secondsPassed, [player]);
        }
        player?.update(secondsPassed, ghosts);
    }

    #draw() {
        this.#canvasConfig.clearCtx();
        this.#fpsDisplay.draw(this.#canvasConfig.ctx);
        let ghosts = this.#getGhostList();
        let player = this.#getPlayerObject();
        for (let ghost of ghosts) {
            ghost.draw(this.#canvasConfig.ctx);
        }
        player?.draw(this.#canvasConfig.ctx);
    }

    #getPlayerObject() {
        for (let obj of this.#stateObjects) {
            if (obj instanceof PlayerObject) return obj;
        }
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
}