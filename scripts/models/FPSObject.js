import TextObject from "./TextObject.js";

export default class FPSObject extends TextObject {
    _fps;

    constructor() {
        super(10, 30, 'black', '25px Arial', 300, 'FPS: ');
        this._fps = 0;
    }

    calculateFps(secondsPassed) {
        this._fps = Math.round(1 / secondsPassed);
    }

    draw(ctx) {
        ctx.font = this._textFont;
        ctx.fillStyle = this._fillColor;
        ctx.fillText(this._text + this._fps, this._x, this._y);
    }

    update(secondsPassed) {
        this.calculateFps(secondsPassed);
    }

    get fps() {
        return this._fps;
    }

    set fps(fps) {
        this._fps = fps;
    }
}