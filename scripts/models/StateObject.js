import MathUtil from "../util/MathUtil.js";
import Util from "../util/Util.js";

export default class StateObject {
    _id;
    _x;
    _y;
    _width;
    _height;
    _speed;
    _fillColor;
    _baseFillColor;
    _direction;
    _colliding = {
        collisionDirection: '',
        collision: false,
    };
    _directionMap = {
        'left': false,
        'right': false,
        'up': false,
        'down': false
    }

    constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, fillColor = 'black') {
        this._id = crypto.randomUUID();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._speed = speed;
        this._fillColor = fillColor;
        this._baseFillColor = this._fillColor;
        this._direction = '';
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
        this._direction = direction;
        switch(direction) {
            case 'up':
                if (this._colliding.collisionDirection != direction)
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

    changeDirection(direction) {
        this._direction = direction;
        for (let key of Object.keys(this._directionMap)) {
            if (key === direction) {
                this._directionMap[key] = true;
            } else {
                this._directionMap[key] = false;
            }
        }
    }

    detectCollision(objects) {
        let positionList = Util.buildXYList(objects, this._id);
        for (let position of positionList) {
            const collision = Util.isColliding(this, position);
            if (collision[0]) {
                this._fillColor = 'red';
                this._colliding.collision = true;
                if (collision[2]) {
                    this._colliding.collisionDirection = Util.getOppositeDirection(collision[2]);
                } else {
                    this._colliding.collisionDirection = this._direction;
                }
            } else {
                this._fillColor = this._baseFillColor;
                this._colliding.collision = false;
                this._colliding.collisionDirection = '';
            }
        };
    }

    draw(ctx) {
        ctx.fillStyle = this._fillColor;
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }

    update(secondsPassed, collisionObjects) {
        this.detectCollision(collisionObjects);
        if (this._direction === 'left' && this._colliding.collisionDirection != 'left') {
            this.move('left', secondsPassed);
        }
        if (this._direction === 'right' && this._colliding.collisionDirection != 'right') {
            this.move('right', secondsPassed);
        }
        if (this._direction === 'up' && this._colliding.collisionDirection != 'up') {
            this.move('up', secondsPassed);
        }
        if (this._direction === 'down' && this._colliding.collisionDirection != 'down') {
            this.move('down', secondsPassed);
        }
    }

    get direction() {
        return this._direction;
    }

    get id() {
        return this._id;
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

    set id(id) {
        this._id = id;
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

    set direction(direction) {
        this._direction = direction;
    }
}
