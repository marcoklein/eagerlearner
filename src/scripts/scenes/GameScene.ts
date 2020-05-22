import FpsText from '../objects/fpsText';
import { LevelController } from '../level/LevelController';
import { HudScene } from './HudScene';

export class GameScene extends Phaser.Scene {
  level: LevelController;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // show hud scene
    this.scene.add('HudScene', HudScene, true);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);

    this.level = new LevelController(this);
    this.level.init();
  }

  update(time: number, delta: number) {
    this.level.update(time, delta);
  }
}
