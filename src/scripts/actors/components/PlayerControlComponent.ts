import { Hero } from '../Hero';
import { GlobalConfig } from '../../Globals';

export type ControlNames = 'left' | 'right';

export interface IControlKeys {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  jump: Phaser.Input.Keyboard.Key;
  primary: Phaser.Input.Keyboard.Key;
  secondary: Phaser.Input.Keyboard.Key;
}

export type ControlActionsType = {
  [P in keyof IControlKeys]: () => void;
};

const GAMEPAD_AXIS_THRESHOLD = 0.3;

/**
 * Controls a player.
 */
export class PlayerControlComponent {

  scene: Phaser.Scene;
  player: Hero;

  controlKeys: IControlKeys;

  actions: ControlActionsType;

  constructor(scene: Phaser.Scene, player: Hero) {
    this.scene = scene;
    this.player = player;
    this.initKeyboard();
  }

  private initKeyboard() {
    console.log('player input keyboard init');
    const keyboard = this.scene.input.keyboard;
    this.controlKeys = {
      left: keyboard.addKey('A'),
      right: keyboard.addKey('D'),
      jump: keyboard.addKey('W'),
      primary: keyboard.addKey('SPACE'),
      secondary: keyboard.addKey('Q'),
    };
  }

  update(time: number, delta: number) {
    const pads = this.scene.input.gamepad.gamepads;
    const pad = pads.length ? pads[0] : undefined;

    if (this.controlKeys.primary.isDown || (pad && pad.A)) {
      this.player.hands.action();
    }
    if ((this.controlKeys.jump.isDown || (pad && pad.B)) && this.player.body.touching.down) {
      this.player.jump();
    }

    // handle input
    const maxSpeed = GlobalConfig.player.speed;
    // range where speed can be directly adjusted
    // movement speed may be adjusted from 110 directly to -110 for example
    const controllableSpeedRange = maxSpeed * 1.2;
    let directionVel = 0;
    if (this.controlKeys.left.isDown || (pad && pad.getAxisValue(0) < -GAMEPAD_AXIS_THRESHOLD)) {
      directionVel -= maxSpeed;
    }
    if (this.controlKeys.right.isDown || (pad && pad.getAxisValue(0) > GAMEPAD_AXIS_THRESHOLD)) {
      directionVel += maxSpeed;
    }

    const curVel = this.player.body.velocity.x;
    if (directionVel !== 0 && Math.abs(curVel) < controllableSpeedRange) {
      // we can set the velocity :)
      this.player.setVelocityX(directionVel);
    }

    if (directionVel !== 0) {
      this.player.flipX = directionVel < 0 ? true : false;
    }
  }
}
