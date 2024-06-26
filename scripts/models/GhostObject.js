import StateObject from "./StateObject.js";
import Util from "../util/Util.js";

export default class GhostObject extends StateObject {
    constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, fillColor = 'black') {
        super(x, y, width, height, speed, fillColor, '../assets/ghost.png');
        this.pickRandomDirection();
    }

    pickRandomDirection() {
        let choices = Object.keys(this.directionMap);
        let randomIndex = Math.floor(Math.random() * choices.length);
        let choice = choices[randomIndex];
        this.changeDirection(choice);
        this.updateLastDirection(choice);
    }

    oppositeDirection(direction) {
        if (direction) {
            this.changeDirection(Util.getOppositeDirection(direction), true);
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