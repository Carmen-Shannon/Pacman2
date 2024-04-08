import MathUtil from "../util/MathUtil.js";
import Util from "../util/Util.js";
import CanvasConfig from "../config/CanvasConfig.js";

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
    #lastDirection = '';
    #colliding = {
        collision: false,
        collisionMap: {},
    };
    #directionMap = {
        'left': false,
        'right': false,
        'up': false,
        'down': false
    }
    #spriteSheet = {
        image: new Image(),
        width: 150,
        height: 150,
        scale: 3,
        scaledWidth: 100,
        scaledHeight: 100,
        cycleLoop: [0, 1, 2, 3, 4, 5, 6, 7],
    };
    #animationStep = 0;
    #audio = new Audio();

    constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, fillColor = 'black', spriteSheetPath = '') {
        this.#id = crypto.randomUUID();
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#speed = speed;
        this.#fillColor = fillColor;
        this.#baseFillColor = this.#fillColor;
        this.#direction = '';
        this.#audio = new Audio();
        this.#audio.volume = 0.20;

        let spriteSheet = new Image();
        spriteSheet.src = spriteSheetPath;
        this.#spriteSheet.image = spriteSheet;
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
                if (key === direction && !this.#colliding.collisionMap[direction]) {
                    this.#directionMap[key] = true;
                } else {
                    this.#directionMap[key] = false;
                }
            }
        } else {
            for (let key of Object.keys(this.#directionMap)) {
                if (key === direction && !this.#colliding.collisionMap[direction]) {
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
        let collisionCheck = false;
        const collisionMap = {
            'up': false,
            'down': false,
            'left': false,
            'right': false
        }
        for (let position of positionList) {
            const collision = Util.isColliding(this, position);
            if (collision[0]) {
                collisionCheck = true;
                collisionMap[collision[1]] = true;
            }
        };
        this.#colliding.collision = collisionCheck;
        this.#fillColor = collisionCheck ? 'red' : this.#baseFillColor;
        this.#colliding.collisionMap = Object.values(collisionMap).includes(true) ? collisionMap : {};
        // if (collisionCheck) {
        //     if (this.#audio.paused) {
        //         this.#playAudio();
        //     }
        // }
    }

    draw(ctx) {
        let frameX = this.#spriteSheet.cycleLoop[this.#animationStep]
        let frameY = this.#animationDirection(this.#lastDirection);
        this.#drawFrame(frameX, frameY, ctx);
    }

    update(secondsPassed, collisionObjects) {
        if (collisionObjects) {
            this.detectCollision(collisionObjects);
        }

        if (!this.#colliding.collisionMap[this.#direction]) {
            this.move(this.#direction, secondsPassed);
        }
    }

    updateLastDirection(direction) {
        this.#lastDirection = direction;
    }

    #animationDirection(lastDirection) {
        let directionMap = {
            'right': 0,
            'left': 1,
            'up': 2,
            'down': 3
        };
        if (lastDirection && lastDirection.length === 0) {
            return directionMap[this.#direction];
        }

        return directionMap[lastDirection];
    }

    #drawFrame(frameX = 0, frameY = 0, ctx = new CanvasConfig().ctx) {
        ctx.drawImage(this.#spriteSheet.image, frameX * this.#spriteSheet.width, frameY * this.#spriteSheet.height, this.#spriteSheet.width, this.#spriteSheet.height, this.x, this.y, this.#spriteSheet.scaledWidth, this.#spriteSheet.scaledHeight);
    }

    #playAudio() {
        let rand = Math.round(Math.random());
        if (rand) {
            this.#audio.src = '../assets/jcwomp.mp3';
        } else {
            this.#audio.src = '../assets/jcyeah.mp3';
        }
        this.#audio.play();
    }

    stepAnimation() {
        if (this.#animationStep > this.#spriteSheet.cycleLoop.length - 1) {
            this.#animationStep = 0;
        } else {
            this.#animationStep += 1;
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

    get spriteSheet() {
        return this.#spriteSheet;
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
