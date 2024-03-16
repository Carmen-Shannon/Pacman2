export default class WindowEvents {
    static resize(element) {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }

    static clearCtx(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}