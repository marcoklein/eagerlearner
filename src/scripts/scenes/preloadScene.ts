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
    this.load.image('monster.1', 'assets/sprites/monster-1.png');
    this.load.image('monster.5', 'assets/sprites/monster-5.png');
    this.load.image('monster.hand', 'assets/sprites/monster-hand.png');

    this.load.image('world.door', 'assets/sprites/door.png');
    this.load.image('world.platform', 'assets/sprites/platform.png');

    this.load.image('learn.blackboard', 'assets/sprites/blackboard.png');
    this.load.image('learn.teacher', 'assets/sprites/teacher.png');
    this.load.image('learn.box', 'assets/sprites/answer-box.png');
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