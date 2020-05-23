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

    this.level = new LevelController(this);
    this.level.init();
  }

  update(time: number, delta: number) {
    this.level.update(time, delta);
  }
}
