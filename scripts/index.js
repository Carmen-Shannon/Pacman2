import { CanvasConfig, FPSConfig } from "./config/Index.js";
import { PlayerObject, FPSObject, GhostObject, WallObject } from "./models/Index.js";
import Game from "./game/Game.js";

// set up config and game objects
const canvasConfig = new CanvasConfig();
const player = new PlayerObject(50, 50, 50);
const fpsDisplay = new FPSObject();
const fpsConfig = new FPSConfig(60);
const ghosts = [
    new GhostObject(250, 250, 50, 50, 0, 'black')
];
const walls = WallObject.generateWalls(canvasConfig);

// set up main game process
const game = new Game(fpsConfig, fpsDisplay, canvasConfig, [player, ...ghosts], [], walls);

window.addEventListener('load', () => game.init());
