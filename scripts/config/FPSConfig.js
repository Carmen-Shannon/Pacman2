export default class FPSConfig {
    _delta;
    _fpsTarget;
    _interval;
    _then;
    _now;
    _secondsPassed;

    constructor(fpsTarget) {
        this._delta = 0;
        this._fpsTarget = fpsTarget;
        this._interval = 1000 / fpsTarget;
        this._then = 0;
        this._now = 0;
        this._secondsPassed = 0;
    }

    updateDelta() {
        this._delta = this._now - this._then;
    }

    updateSecondsPassed() {
        this._secondsPassed = (this._now - this._then) / 1000;
    }

    updateNow(timestamp) {
        this._now = timestamp;
    }

    updateThen(timestamp) {
        if (timestamp) {
            this._then = this._then ? this._then : timestamp;
        } else {
            this._then = this._now - (this._delta % this._interval);
        }
    }

    shouldUpdate() {
        return this._delta > this._interval;
    }

    get then() {
        return this._then;
    }

    get delta() {
        return this._delta;
    }

    get interval() {
        return this._interval;
    }

    get secondsPassed() {
        return this._secondsPassed;
    }

    set then(then) {
        this._then = then;
    }

    set delta(delta) {
        this._delta = delta;
    }

    set interval(interval) {
        this._interval = interval;
    }

    set secondsPassed(secondsPassed) {
        this._secondsPassed = secondsPassed
    }
}