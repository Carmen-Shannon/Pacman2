import PlayerObject from "../models/PlayerObject.js";

export default class KeyEvents {
    static keyDown(event = undefined, playerObject = new PlayerObject()) {
        playerObject.keyDown(event.keyCode);
    }

    static keyUp(event = undefined, playerObject = new PlayerObject()) {
        playerObject.keyUp(event.keyCode);
    }
}