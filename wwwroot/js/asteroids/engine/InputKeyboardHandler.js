import Constants from '../constants.js';
import { Control, controls } from './controls.js';

const turnLeftKey = controls[0].keyboard[Control.TURN_LEFT];
const turnRightKey = controls[0].keyboard[Control.TURN_RIGHT];
const thrustingKey = controls[0].keyboard[Control.THRUSTING];
const shootKey = controls[0].keyboard[Control.SHOOT];

let currentShip = null;

// set up event handlers
export function registerKeyboardEvents(ship) {
    if (currentShip) {
        window.removeEventListener('keydown', currentShip.keyDownHandler);
        window.removeEventListener('keyup', currentShip.keyUpHandler);
    }

    currentShip = ship;
    currentShip.keyDownHandler = (ev) => keyDown(ev, currentShip);
    currentShip.keyUpHandler = (ev) => keyUp(ev, currentShip);

    window.addEventListener('keydown', currentShip.keyDownHandler);
    window.addEventListener('keyup', currentShip.keyUpHandler);
}

function keyDown(ev, ship) {
    if (ship.dead) return;

    ev.preventDefault();

    switch (ev.key) { //(ev.keyCode) {
        case ' ': //32: // spce bar ( shoot laser )
            ship.shootLaser();
            break;
        case turnLeftKey://37: // left arrow (rotate ship left)
            ship.rot = Constants.SHIP_TURN_SPD / 180 * Math.PI / Constants.FPS;
            break;
        case thrustingKey: //38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;
        case turnRightKey:// 39: // right arrow (rotate ship right)
            ship.rot = -Constants.SHIP_TURN_SPD / 180 * Math.PI / Constants.FPS;
            break;
    }
}

function keyUp(ev, ship) {
    if (ship.dead) return;

    ev.preventDefault();

    switch (ev.key) {
        case ' ': // space bar (allow shooting again)
            ship.canShoot = true;
            break;
        case turnLeftKey: // left arrow (stop rotating left)
            ship.rot = 0;
            break;
        case thrustingKey: // up arrow (stop thrusting)
            ship.thrusting = false;
            break;
        case turnRightKey: // right arrow (stop rotating right)
            ship.rot = 0;
            break;
    }
}