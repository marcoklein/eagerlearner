import { Hero } from '../actors/Hero';
import FpsText from '../objects/fpsText';
import { MonsterSpawner } from '../world/MonsterSpawner';
import { PlatformController } from '../world/PlatformController';
import { Gun } from '../actors/wearables/Gun';
import { ProjectileController } from '../world/ProjectileController';
import { CollisionController } from '../world/CollisionController';
import { LevelController } from '../world/LevelController';

export class GameScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  level: LevelController;

  constructor() {
    super({ key: 'GameScene' });
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
    this.level.init();
    this.level.createLevel1();
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);
    this.level.update(time, delta);
  }
}
