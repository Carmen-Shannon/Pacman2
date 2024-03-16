import StateObject from "./StateObject.js";

export default class TextObject extends StateObject {
    _textFont;
    _text;
    _maxWidth;

    constructor(x = 0, y = 0, textColor = 'black', textFont = '25px Arial', maxWidth = 0, text = '') {
        super(x, y, 0, 0, 0, textColor);
        this._textFont = textFont;
        this._text = text;
        this._maxWidth = maxWidth;
    }

    draw(ctx) {
        ctx.font = this._textFont;
        ctx.fillStyle = this._fillColor;
        ctx.fillText(this._text, this._x, this._y, this._maxWidth ?? 100);
    }
}