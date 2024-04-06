import TextObject from "./TextObject.js";

export default class FPSObject extends TextObject {
    #fps;

    constructor() {
        super(10, 30, 'black', '25px Arial', 300, 'FPS: ');
        this.#fps = 0;
    }

    calculateFps(secondsPassed) {
        this.#fps = Math.round(1 / secondsPassed);
    }

    draw(ctx) {
        ctx.font = this.textFont;
        ctx.fillStyle = this.fillColor;
        ctx.fillText(this.text + this.#fps, this.x, this.y);
    }

    update(secondsPassed) {
        this.calculateFps(secondsPassed);
    }

    get fps() {
        return this.#fps;
    }

    set fps(fps) {
        this.#fps = fps;
    }
}