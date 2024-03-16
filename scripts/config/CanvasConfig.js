export default class CanvasConfig {
    _canvas;
    _ctx;

    init(canvas = undefined, ctx = undefined) {
        this._canvas = canvas;
        this._ctx = ctx;
    }

    clearCtx() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    get canvas() {
        return this._canvas;
    }

    get ctx() {
        return this._ctx;
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    set ctx(ctx) {
        this._ctx = ctx;
    }

}