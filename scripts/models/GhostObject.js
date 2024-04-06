import StateObject from "./StateObject.js";
import Util from "../util/Util.js";

export default class GhostObject extends StateObject {
    constructor(x = 0, y = 0, width = 0, height = 0, speed = 100, fillColor = 'black') {
        super(x, y, width, height, speed, fillColor);
        this.pickRandomDirection();
    }

    pickRandomDirection() {
        let choices = Object.keys(this.directionMap);
        let randomIndex = Math.floor(Math.random() * choices.length);
        let choice = choices[randomIndex];
        this.changeDirection(choice);
    }

    oppositeDirection(direction) {
        if (direction) {
            this.changeDirection(Util.getOppositeDirection(direction));
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
            switch(this.direction) {
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