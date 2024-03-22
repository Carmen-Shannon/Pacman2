import StateObject from "./StateObject.js";
import Util from "../util/Util.js";

export default class PlayerObject extends StateObject {
    _lastDirection;
    _keyMap = {
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down',
    }

    constructor(width = 0, height = 0, speed = 0) {
        super(0, 0, width, height, speed, 'yellow');
        this.lastDirection = this._direction;
    }

    isKeyDown(direction = '') {
        return Boolean(this._directionMap[direction]);
    }

    getKeyMapValue(key = '') {
        return this._keyMap[key];
    }

    keyDown(keyCode = '') {
        let direction = this.getKeyMapValue(keyCode);
        if (this._colliding.collisionDirection != direction) {
            this._lastDirection = this._direction;
            this.changeDirection(direction, true);
        }
    }

    keyUp(keyCode = '') {
        let direction = this.getKeyMapValue(keyCode);
        this.stopMovement(direction);
    }

    stopMovement(direction = '') {
        this._directionMap[direction] = false;
        if (this.isKeyDown(this._lastDirection)) {
            this.changeDirection(this._lastDirection, true);
            this._lastDirection = direction;
        } else if (!this.isKeyDown(this._direction)) {
            this.changeDirection('', true);
            this.lastDirection = direction;
        } else {
            this._lastDirection = this._direction;
        }
    }

    // detectCollision(objects) {
    //     let positionList = Util.buildXYList(objects, this._id);
    //     for (let position of positionList) {
    //         const collision = Util.isColliding(this, position);
    //         if (collision[0]) {
    //             this._fillColor = 'red';
    //             this._colliding.collision = true;
    //             this._colliding.collisionDirection = collision[1];
    //             this.stopMovement(collision[1]);
    //         } else {
    //             this._fillColor = this._baseFillColor;
    //             this._colliding.collision = false;
    //         }
    //     };
    // }

    changeDirection(direction, val = false) {
        this._direction = direction;
        if (Object.keys(this._directionMap).includes(direction)) {
            this._directionMap[direction] = val;
        }
    }
}