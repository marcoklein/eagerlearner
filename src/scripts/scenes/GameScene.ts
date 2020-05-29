import FpsText from '../objects/fpsText';
import { LevelController } from '../level/LevelController';
import { HudScene } from './HudScene';

export class GameScene extends Phaser.Scene {
  level: LevelController;
  backgroundColor: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // show hud scene
    this.scene.add('HudScene', HudScene, true);
    this.createBackground();

    this.level = new LevelController(this);
    this.level.init();
  }

  update(time: number, delta: number) {
    this.level.update(time, delta);
  }

  createBackground() {
    // this.backgroundColor = this.add.graphics();
    // this.backgroundColor.fillStyle(0x121212, 0.5);
    // this.backgroundColor.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    // this.backgroundColor.setDepth(-100);
    this.cameras.main.setBackgroundColor(0xdfdfef);
  }
}
