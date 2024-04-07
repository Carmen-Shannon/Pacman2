import StaticObject from "./StaticObject.js";
import CanvasConfig from "../config/CanvasConfig.js";

export default class WallObject extends StaticObject {
    constructor(x = 0, y = 0, width = 0, height = 0, fillColor = 'black') {
        super(x, y, width, height, fillColor);
    }

    static generateWalls(canvas = new CanvasConfig()) {
        let topWall = new WallObject(50, 0, canvas.canvas.width - 100, 50, 'blue');
        let bottomWall = new WallObject(50, canvas.canvas.height - 50, canvas.canvas.width - 100, 50, 'blue');
        let leftWall = new WallObject(0, 0, 50, canvas.canvas.height, 'blue');
        let rightWall = new WallObject(canvas.canvas.width - 50, 0, 50, canvas.canvas.height, 'blue');
        
        let walls = [topWall, bottomWall, leftWall, rightWall];
        return walls;
    }
}