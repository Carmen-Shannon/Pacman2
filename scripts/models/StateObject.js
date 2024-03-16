import MathUtil from "../util/MathUtil.js";

export default class StateObject {
    _x;
    _y;
    _width;
    _height;
    _speed;
    _fillColor;

    constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, fillColor = 'black') {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._speed = speed;
        this._fillColor = fillColor;
    }

    moveLinear(direction, timePassed, duration) {
        switch(direction) {
            case 'up':
                this._x = MathUtil.easeLinear(timePassed, this._x, this._x - this._speed, duration);
                break;
            case 'down':
                this._x = MathUtil.easeLinear(timePassed, this._x, this._x + this._speed, duration);
                break;
            case 'left':
                this._y = MathUtil.easeLinear(timePassed, this._y, this._y - this._speed, duration);
                break;
            case 'right':
                this._y = MathUtil.easeLinear(timePassed, this._y, this._y + this._speed, duration);
                break;
            default:
                break;
        }
    }

    moveQuint(direction, timePassed, duration) {
        switch(direction) {
            case 'up':
                this._x = MathUtil.easeInOutQuint(timePassed, this._x, this._x - this._speed, duration);
                break;
            case 'down':
                this._x = MathUtil.easeInOutQuint(timePassed, this._x, this._x + this._speed, duration);
                break;
            case 'left':
                this._y = MathUtil.easeInOutQuint(timePassed, this._y, this._y - this._speed, duration);
                break;
            case 'right':
                this._y = MathUtil.easeInOutQuint(timePassed, this._y, this._y + this._speed, duration);
                break;
            default:
                break;
        }
    }

    move(direction, secondsPassed) {
        switch(direction) {
            case 'up':
                this._y -= this._speed * secondsPassed;
                break;
            case 'down':
                this._y += this._speed * secondsPassed;
                break;
            case 'left':
                this._x -= this._speed * secondsPassed;
                break;
            case 'right':
                this._x += this._speed * secondsPassed;
                break;
            default:
                break;
        }
    }

    draw(ctx) {
        // const randomColor = Math.random() > 0.5 ? '#ff8080' : '#0099b0';
        ctx.fillStyle = this._fillColor;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    update(direction, secondsPassed) {
        if (direction === 'left') {
            this.move('left', secondsPassed);
        }
        if (direction === 'right') {
            this.move('right', secondsPassed);
        }
        if (direction === 'up') {
            this.move('up', secondsPassed);
        }
        if (direction === 'down') {
            this.move('down', secondsPassed);
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get speed() {
        return this._speed;
    }
    
    get fillColor() {
        return this._fillColor;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    set width(width) {
        this._width = width;
    }

    set height(height) {
        this.height = height;
    }

    set speed(speed) {
        this._speed = speed;
    }

    set fillColor(fillColor) {
        this._fillColor = fillColor;
    }
}
