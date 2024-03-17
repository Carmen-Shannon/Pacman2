import { KeyEvents, WindowEvents } from "./events/Index.js";
import { CanvasConfig, FPSConfig } from "./config/Index.js";
import { PlayerObject, FPSObject, GhostObject } from "./models/Index.js";

const canvasConfig = new CanvasConfig();
const player = new PlayerObject(100, 100, 200);
const fpsDisplay = new FPSObject();
const fpsConfig = new FPSConfig(60);
const ghosts = [
    new GhostObject(250, 250, 100, 100, 50, 'black')
];

const gameLoop = (timestamp) => {
    fpsConfig.updateNow(timestamp);
    fpsConfig.updateThen(timestamp);
    fpsConfig.updateDelta();
    fpsConfig.updateSecondsPassed();

    if (fpsConfig.shouldUpdate()) {
        fpsConfig.updateThen();
        update(fpsConfig.secondsPassed);
        draw(canvasConfig.ctx);
    }
    window.requestAnimationFrame(gameLoop);
}

const init = () => {
    let canvas = document.getElementById('gamewindow');
    let ctx = canvas.getContext('2d');
    canvasConfig.init(canvas, ctx);

    WindowEvents.resize(canvasConfig.canvas);

    window.addEventListener('keydown', (event) => {
        KeyEvents.keyDown(event, player);
    });
    window.addEventListener('keyup', (event) => {
        KeyEvents.keyUp(event, player);
    });
    window.addEventListener('resize', () => {
        WindowEvents.resize(canvasConfig.canvas);
    });

    window.requestAnimationFrame(gameLoop);
}

const update = (secondsPassed) => {
    fpsDisplay.update(secondsPassed);
    for (let ghost of ghosts) {
        ghost.update(secondsPassed);
        ghost.detectCollision([player]);
    }
    player.update(secondsPassed);
    player.detectCollision(ghosts);
}

const draw = (ctx) => {
    canvasConfig.clearCtx();
    fpsDisplay.draw(ctx);
    for (let ghost of ghosts) {
        ghost.draw(ctx);
    }
    player.draw(ctx);
}

window.onload = init;
