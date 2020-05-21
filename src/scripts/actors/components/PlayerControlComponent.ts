import { Hero } from '../Hero';

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
    // this.initActions();
  }

  private initKeyboard() {
    const keyboard = this.scene.input.keyboard;
    this.controlKeys = {
      left: keyboard.addKey('A'),
      right: keyboard.addKey('D'),
      jump: keyboard.addKey('W'),
      primary: keyboard.addKey('E'),
      secondary: keyboard.addKey('Q'),
    };
  }

  // private initActions() {
  //   this.actions = {
  //     left: () => {

  //     },
  //     right: () => {

  //     },
  //     jump: () => {

  //     }
  //   };
  // }

  update(time: number, delta: number) {
    // handle input
    // Object.keys(this.controlKeys).forEach(key => {
    //   const val = this.controlKeys[key];

    // })
    console.log('update');
    let directionVel = 0;
    if (this.controlKeys.left.isDown) {
      directionVel -= 160;
    }
    if (this.controlKeys.right.isDown) {
      directionVel += 160;
    }
    this.player.setVelocityX(directionVel);

    if (directionVel !== 0) {
      this.player.flipX = directionVel < 0 ? true : false;
    }

    if (this.controlKeys.jump.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.controlKeys.primary.isDown) {
      this.player.hands.hit();
    }
  }
}
