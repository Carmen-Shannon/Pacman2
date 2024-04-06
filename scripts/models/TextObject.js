import StateObject from "./StateObject.js";

export default class TextObject extends StateObject {
    #textFont;
    #text;
    #maxWidth;

    constructor(x = 0, y = 0, textColor = 'black', textFont = '25px Arial', maxWidth = 0, text = '') {
        super(x, y, 0, 0, 0, textColor);
        this.#textFont = textFont;
        this.#text = text;
        this.#maxWidth = maxWidth;
    }

    draw(ctx) {
        ctx.font = this.#textFont;
        ctx.fillStyle = this.fillColor;
        ctx.fillText(this.#text, this.x, this.y, this.#maxWidth ?? 100);
    }

    get textFont() {
        return this.#textFont;
    }

    get text() {
        return this.#text;
    }

    get maxWidth() {
        return this.#maxWidth;
    }

    set textFont(textFont) {
        this.#textFont = textFont;
    }

    set text(text) {
        this.#text = text;
    }

    set maxWidth(maxWidth) {
        this.#maxWidth = maxWidth;
    }
}