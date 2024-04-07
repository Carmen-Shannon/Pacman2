export default class StaticObject {
    #x;
    #y;
    #width;
    #height;
    #fillColor;

    constructor(x = 0, y = 0, width = 0, height = 0, fillColor = 'black') {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#fillColor = fillColor;
    }

    draw(ctx) {
        ctx.fillStyle = this.#fillColor;
        ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get fillColor() {
        return this.#fillColor;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }

    set width(width) {
        this.#width = width;
    }

    set height(height) {
        this.#height = height;
    }

    set fillColor(fillColor) {
        this.#fillColor = fillColor;
    }
}