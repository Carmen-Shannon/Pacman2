import StateObject from "./StateObject.js";
import Util from "../util/Util.js";

export default class GhostObject extends StateObject {
    _directionMap = {
        'left': false,
        'right': false,
        'up': false,
        'down': false
    }

    constructor(x = 0, y = 0, width = 0, height = 0, speed = 100, fillColor = 'black') {
        super(x, y, width, height, speed, fillColor);
        this.pickRandomDirection();
    }

    detectCollision(objects) {
        let positionList = Util.buildXYList(objects, this._id);
        for (let position of positionList) {
            const collision = Util.isColliding(position, this);
            if (collision[0]) {
                this._fillColor = 'red';
                this._colliding.collision = true;
                this._colliding.collisionDirection = collision[1];
                this.oppositeDirection(collision[1]);
            } else {
                this._fillColor = this._baseFillColor;
                this._colliding.collision = false;
                this._colliding.collisionDirection = '';
            }
        };
    }

    pickRandomDirection() {
        let choices = Object.keys(this._directionMap);
        let randomIndex = Math.floor(Math.random() * choices.length);
        let choice = choices[randomIndex];
        this.changeDirection(choice);
    }

    changeDirection(direction) {
        this._direction = direction;
        for (let key of Object.keys(this._directionMap)) {
            if (key === direction) {
                this._directionMap[key] = true;
            } else {
                this._directionMap[key] = false;
            }
        }
    }

    oppositeDirection(direction) {
        if (direction) {
            this.changeDirection(this.getOppositeDirection(direction));
        } else {
            this.changeDirection(this.getOppositeDirection());
        }
    }

    getOppositeDirection(direction) {
        if (direction) {
            switch(direction) {
                case 'up':
                    return 'down';
                case 'down':
                    return 'up';
                case 'left':
                    return 'right';
                case 'right':
                    return 'left';
            }
        } else {
            switch(this._direction) {
                case 'up':
                    return 'down';
                case 'down':
                    return 'up';
                case 'left':
                    return 'right';
                case 'right':
                    return 'left';
            }
        }
    }

}