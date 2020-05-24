import { GameScene } from './GameScene';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('player.body', 'assets/sprites/player.png');
    this.load.image('player.hand', 'assets/sprites/hand.png');

    this.load.image('weapon.gun', 'assets/sprites/gun.png');
    this.load.image('weapon.bullet', 'assets/sprites/bullet.png');

    this.weapons(['plus', 'equal', 'sigma']);

    this.monsters(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

    this.load.image('monster.hand', 'assets/sprites/monster-hand.png');

    this.load.image('world.door', 'assets/sprites/door.png');
    this.load.image('world.platform', 'assets/sprites/platform.png');

    this.load.image('learn.blackboard', 'assets/sprites/blackboard.png');
    this.load.image('learn.teacher', 'assets/sprites/teacher.png');
    this.load.image('learn.box', 'assets/sprites/answer-box.png');
  }

  private weapons(names: string[]) {
    names.forEach((name) => this.loadWeaponWithBullet(name));
  }

  private loadWeaponWithBullet(name: string) {
    this.load.image(`weapon.${name}`, `assets/sprites/weapon.${name}.png`);
    this.load.image(`bullet.${name}`, `assets/sprites/bullet.${name}.png`);
  }

  private monsters(names: string[]) {
    names.forEach((name) => this.loadMonster(name));
  }
  private loadMonster(name: string) {
    this.load.image(`monster.${name}`, `assets/sprites/monster.${name}.png`);
  }

  create() {
    this.scene.add('GameScene', GameScene, true);

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
