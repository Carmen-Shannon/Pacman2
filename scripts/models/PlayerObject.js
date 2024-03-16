import StateObject from "./StateObject.js";

export default class PlayerObject extends StateObject {
    _keyMap = {
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down'
    }

    _pressedKeys = {
        left: false,
        right: false,
        up: false,
        down: false
    }

    constructor(width = 0, height = 0, speed = 0) {
        super(0, 0, width, height, speed);
    }

    isKeyPressed(key = '') {
        return this._pressedKeys[key];
    }

    updatePressedKey(key = '', val = false) {
        this._pressedKeys[key] = val;
    }

    getKeyMapValue(key = '') {
        return this._keyMap[key];
    }

    keyDown(keyCode) {
        let key = this.getKeyMapValue(keyCode);
        this.updatePressedKey(key, true);
    }

    keyUp(keyCode) {
        let key = this.getKeyMapValue(keyCode);
        this.updatePressedKey(key, false);
    }

    update(secondsPassed) {
        if (this.isKeyPressed('left')) {
            this.move('left', secondsPassed);
        }
        if (this.isKeyPressed('right')) {
            this.move('right', secondsPassed);
        }
        if (this.isKeyPressed('up')) {
            this.move('up', secondsPassed);
        }
        if (this.isKeyPressed('down')) {
            this.move('down', secondsPassed);
        }
    }
}