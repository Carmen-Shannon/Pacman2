export default class Util {
    static buildXYList(stateObjects, id) {
        if (!id) {
            return stateObjects.map((obj) => {
                return {x: obj.x, y: obj.y, width: obj.width, height: obj.height};
            });
        }
        return stateObjects.map((obj) => {
            if (obj.id === id) {
                return;
            }
            return {x: obj.x, y: obj.y, width: obj.width, height: obj.height};
        });
    }
    
    static isColliding(object1, object2) {
        const collisionMap = {
            'up': false,
            'down': false,
            'left': false,
            'right': false
        }
        let isColliding = false;
        const object1x = Math.round(object1.x);
        const object1y = Math.round(object1.y);
        const object2x = Math.round(object2.x);
        const object2y = Math.round(object2.y);

        if (object2x > object1.width + object1x || object1x > object2.width + object2x || object2y > object1.height + object1y || object1y > object2.height + object2y) {
            return [isColliding, collisionMap];
        }
        if (object1y >= (object2y + object2.height) - 2 && object1y <= (object2y + object2.height) + 2) {
            isColliding = true;
            collisionMap['up'] = true;
            return [true, 'up'];
        }
        if (object2y >= (object1y + object1.height) - 2 && object2y <= (object1y + object1.height) + 2) {
            isColliding = true;
            collisionMap['down'] = true;
            return [true, 'down'];
        }
        if (object1x >= (object2x + object2.width) - 2 && object1x <= (object2x + object2.width) + 2) {
            isColliding = true;
            collisionMap['left'] = true;
            return [true, 'left'];
        }
        if (object2x >= (object1x + object1.width) - 2 && object2x <= (object1x + object1.width) + 2) {
            isColliding = true;
            collisionMap['right'] = true;
            return [true, 'right'];
        }
        return [isColliding, collisionMap];
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