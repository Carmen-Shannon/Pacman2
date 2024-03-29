export default class MathUtil {
    static easeInOutQuint(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }

    static easeLinear(t, b, c, d) {
        return c * t / d + b;
    }
}