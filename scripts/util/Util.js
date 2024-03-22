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
        return [true, object1.direction, object2.direction];
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