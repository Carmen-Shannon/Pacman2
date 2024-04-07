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
        const object1x = Math.round(object1.x);
        const object1y = Math.round(object1.y);
        const object2x = Math.round(object2.x);
        const object2y = Math.round(object2.y);
        if (object1y >= (object2y + object2.height) - 2 && object1y <= (object2y + object2.height) + 2) {
            return [true, 'up'];
        }
        if (object2y >= (object1y + object1.height) - 2 && object2y <= (object1y + object1.height) + 2) {
            return [true, 'down'];
        }
        if (object1x >= (object2x + object2.width) - 2 && object1x <= (object2x + object2.width) + 2) {
            return [true, 'left'];
        }
        if (object2x >= (object1x + object1.width) - 2 && object2x <= (object1x + object1.width) + 2) {
            return [true, 'right'];
        }
        return [true, ''];
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