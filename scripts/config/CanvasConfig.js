export default class CanvasConfig {
    #canvas;
    #ctx;

    constructor() {
        this.#canvas = document.getElementById('gamewindow');
        this.#ctx = this.#canvas.getContext('2d');
    }

    init(canvas = undefined, ctx = undefined) {
        this.#canvas = canvas;
        this.#ctx = ctx;
    }

    clearCtx() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    get canvas() {
        return this.#canvas;
    }

    get ctx() {
        return this.#ctx;
    }

    set canvas(canvas) {
        this.#canvas = canvas;
    }

    set ctx(ctx) {
        this.#ctx = ctx;
    }

}