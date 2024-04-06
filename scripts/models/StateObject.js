import MathUtil from "../util/MathUtil.js";
import Util from "../util/Util.js";

export default class StateObject {
    #id;
    #x;
    #y;
    #width;
    #height;
    #speed;
    #fillColor;
    #baseFillColor;
    #direction;
    #colliding = {
        collisionDirection: '',
        collision: false,
    };
    #directionMap = {
        'left': false,
        'right': false,
        'up': false,
        'down': false
    }

    constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, fillColor = 'black') {
        this.#id = crypto.randomUUID();
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#speed = speed;
        this.#fillColor = fillColor;
        this.#baseFillColor = this.#fillColor;
        this.#direction = '';
    }

    moveLinear(direction, timePassed, duration) {
        switch(direction) {
            case 'up':
                this.#x = MathUtil.easeLinear(timePassed, this.#x, this.#x - this.#speed, duration);
                break;
            case 'down':
                this.#x = MathUtil.easeLinear(timePassed, this.#x, this.#x + this.#speed, duration);
                break;
            case 'left':
                this.#y = MathUtil.easeLinear(timePassed, this.#y, this.#y - this.#speed, duration);
                break;
            case 'right':
                this.#y = MathUtil.easeLinear(timePassed, this.#y, this.#y + this.#speed, duration);
                break;
            default:
                break;
        }
    }

    moveQuint(direction, timePassed, duration) {
        switch(direction) {
            case 'up':
                this.#x = MathUtil.easeInOutQuint(timePassed, this.#x, this.#x - this.#speed, duration);
                break;
            case 'down':
                this.#x = MathUtil.easeInOutQuint(timePassed, this.#x, this.#x + this.#speed, duration);
                break;
            case 'left':
                this.#y = MathUtil.easeInOutQuint(timePassed, this.#y, this.#y - this.#speed, duration);
                break;
            case 'right':
                this.#y = MathUtil.easeInOutQuint(timePassed, this.#y, this.#y + this.#speed, duration);
                break;
            default:
                break;
        }
    }

    move(direction, secondsPassed) {
        this.#direction = direction;
        switch(direction) {
            case 'up':
                this.#y -= this.#speed * secondsPassed;
                break;
            case 'down':
                this.#y += this.#speed * secondsPassed;
                break;
            case 'left':
                this.#x -= this.#speed * secondsPassed;
                break;
            case 'right':
                this.#x += this.#speed * secondsPassed;
                break;
            default:
                break;
        }
    }

    changeDirection(direction = '', override = false) {
        this.#direction = direction;
        if (override) {
            for (let key of Object.keys(this.#directionMap)) {
                if (key === direction && direction != this.#colliding.collisionDirection) {
                    this.#directionMap[key] = true;
                } else {
                    this.#directionMap[key] = false;
                }
            }
        } else {
            for (let key of Object.keys(this.#directionMap)) {
                if (key === direction && direction != this.#colliding.collisionDirection) {
                    this.#directionMap[key] = true;
                }
            }
        }
    }

    clearDirection(direction = '') {
        this.changeDirection('', false);
        this.#directionMap[direction] = false;
    }

    detectCollision(objects) {
        let positionList = Util.buildXYList(objects, this.#id);
        for (let position of positionList) {
            const collision = Util.isColliding(this, position);
            if (collision[0]) {
                this.#fillColor = 'red';
                this.#colliding.collision = true;
                this.#colliding.collisionDirection = collision[1];
            } else {
                this.#fillColor = this.#baseFillColor;
                this.#colliding.collision = false;
                this.#colliding.collisionDirection = '';
            }
        };
    }

    draw(ctx) {
        ctx.fillStyle = this.#fillColor;
        ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
    }

    update(secondsPassed, collisionObjects) {
        if (collisionObjects) {
            this.detectCollision(collisionObjects);
        }

        if (this.#direction != this.#colliding.collisionDirection) {
            this.move(this.#direction, secondsPassed);
        }
    }

    get direction() {
        return this.#direction;
    }

    get id() {
        return this.#id;
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

    get speed() {
        return this.#speed;
    }
    
    get fillColor() {
        return this.#fillColor;
    }

    get directionMap() {
        return this.#directionMap;
    }

    get colliding() {
        return this.#colliding;
    }

    set id(id) {
        this.#id = id;
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

    set speed(speed) {
        this.#speed = speed;
    }

    set fillColor(fillColor) {
        this.#fillColor = fillColor;
    }

    set direction(direction) {
        this.#direction = direction;
    }
}
