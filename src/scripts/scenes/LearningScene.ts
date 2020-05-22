import { LevelController } from '../level/LevelController';
import FpsText from '../objects/fpsText';

export class LearningScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  level: LevelController;

  constructor() {
    super({ key: 'LearningScene' });
  }

  create() {
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);

    this.level = new LevelController(this);
    // this.level.init();
    this.level.createLevel1();
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);
    this.level.update(time, delta);
  }
}
