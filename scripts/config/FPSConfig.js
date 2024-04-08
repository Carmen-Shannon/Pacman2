export default class FPSConfig {
    #delta;
    #interval;
    #then;
    #now;
    #secondsPassed;
    #animationTimer;

    constructor(fpsTarget = 60) {
        this.#delta = 0;
        this.#interval = 1000 / fpsTarget;
        this.#then = 0;
        this.#now = 0;
        this.#secondsPassed = 0;
        this.#animationTimer = 0;
    }

    tick(timestamp) {
        this.updateNow(timestamp);
        this.updateThen(timestamp);
        this.updateDelta();
        this.updateSecondsPassed();
    }

    updateDelta() {
        this.#delta = this.#now - this.#then;
    }

    updateSecondsPassed() {
        this.#secondsPassed = (this.#now - this.#then) / 1000;
    }

    updateNow(timestamp) {
        this.#now = timestamp;
    }

    updateThen(timestamp) {
        if (timestamp) {
            this.#then = this.#then ? this.#then : timestamp;
        } else {
            this.#then = this.#now - (this.#delta % this.#interval);
        }
    }

    shouldUpdate() {
        return this.#delta > this.#interval;
    }

    shouldAnimate() {
        return this.#animationTimer / 12 === 5;
    }

    stepAnimationTimer() {
        this.#animationTimer = this.#animationTimer >= 60 ? 0 : this.#animationTimer + 1; 
    }

    get then() {
        return this.#then;
    }

    get delta() {
        return this.#delta;
    }

    get interval() {
        return this.#interval;
    }

    get secondsPassed() {
        return this.#secondsPassed;
    }

    set then(then) {
        this.#then = then;
    }

    set delta(delta) {
        this.#delta = delta;
    }

    set interval(interval) {
        this.#interval = interval;
    }

    set secondsPassed(secondsPassed) {
        this.#secondsPassed = secondsPassed
    }
}