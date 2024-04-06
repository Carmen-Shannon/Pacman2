import StateObject from "./StateObject.js";

export default class PlayerObject extends StateObject {
    #movementQueue;
    #keyMap = {
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down',
    }

    constructor(width = 0, height = 0, speed = 0) {
        super(0, 0, width, height, speed, 'yellow');
        this.#movementQueue = [];
    }

    isKeyDown(direction = '') {
        return Boolean(this.directionMap[direction]);
    }

    getKeyMapValue(key = '') {
        return this.#keyMap[key];
    }

    keyDown(keyCode = '') {
        let direction = this.getKeyMapValue(keyCode);
        if (this.colliding.collisionDirection != direction) {
            this.#addMovement(direction);
            this.changeDirection(direction, false);
        }
    }

    keyUp(keyCode = '') {
        let direction = this.getKeyMapValue(keyCode);
        this.#stopMovement(direction);
    }

    #stopMovement(direction = '') {
        this.clearDirection(direction);
        this.#removeMovement(direction);
        if (this.#shouldMove()) {
            this.changeDirection(this.#movementQueue[0], false);
        } else {
            this.changeDirection('', false);
        }
    }

    #addMovement(direction = null) {
        if (!direction) return;

        if (this.#getIndex(direction) > 0) {
            let currentIndex = this.#getIndex(direction);
            this.#movementQueue = this.#movementQueue.splice(currentIndex, 1);
            this.#movementQueue.unshift(direction);
        } else if (this.#getIndex(direction) < 0) {
            this.#movementQueue.unshift(direction);
        }
    }

    #removeMovement(direction = null) {
        if (!direction || this.#getIndex(direction) < 0) return;
        let index = this.#getIndex(direction);
        this.#movementQueue.splice(index, 1);
    }

    #getIndex(direction = '') {
        return this.#movementQueue.indexOf(direction);
    }

    #shouldMove() {
        return Boolean(this.#movementQueue[0]);
    }
}