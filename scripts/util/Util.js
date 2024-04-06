export default class Util {
    static buildXYList(stateObjects, id) {
        if (!id) {
            return stateObjects.map((obj) => {
                return {x: obj.x, y: obj.y, width: obj.width, height: obj.height, direction: obj.direction};
            });
        }
        return stateObjects.map((obj) => {
            if (obj.id === id) {
                return;
            }
            return {x: obj.x, y: obj.y, width: obj.width, height: obj.height, direction: obj.direction};
        });
    }
    
    static isColliding(object1, object2) {
        if (object2.x > object1.width + object1.x || object1.x > object2.width + object2.x || object2.y > object1.height + object1.y || object1.y > object2.height + object2.y) {
            return [false, null];
        }
        // if (object1.x + object1.width >= object2.x && object1.y + object1.height === object2.y) {
        //     console.log('rightcollision')
        //     return [true, 'right'];
        // }
        // if (object2.x + object2.width >= object1.x) {
        //     console.log('leftcollision');
        //     return [true, 'left'];
        // }
        // if (object1.y + object1.height >= object2.y) {
        //     console.log('upcollision');
        //     return [true, 'up'];
        // }
        // if (object2.y + object2.height >= object1.y) {
        //     console.log('downcollision')
        //     return [true, 'down']
        // }

        console.log(object1.x, object1.y, object2.x, object2.y);

        if (object1.y + object1.height >= object2.y && object1.y < object2.y && this.#withinBounds(object1, object2, 'up')) {
            console.log('upcollision')
            return [true, 'up'];
        }
        if (object1.x + object1.width >= object2.x && object1.x < object2.x && this.#withinBounds(object1, object2, 'right')) {
            console.log('rightcollision')
            return [true, 'right'];
        }
        if (object2.x + object2.width >= object1.x && object2.x < object1.x && this.#withinBounds(object1, object2, 'left')) {
            console.log('leftcollision')
            return [true, 'left'];
        }
        return [false, null];
    }

    static #withinBounds(object1, object2, direction) {
        switch (direction) {
            case 'left':
            case 'right':
                return (object1.y >= object2.y - object2.height && object1.y <= object2.y + object2.height);
            case 'down':
            case 'up':
                return (object1.x >= object2.x - object2.width && object1.x <= object2.x + object2.width);
        }
    }

    static getOppositeDirection(direction) {
        switch(direction) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
        }
    }
}