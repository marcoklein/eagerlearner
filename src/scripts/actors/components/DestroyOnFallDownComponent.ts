import { GlobalConfig } from '../../Globals';
import { Actor } from '../Actor';

export class DestroyOnFallDownComponent {
  sprite: Actor;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, sprite: Actor) {
    this.scene = scene;
    this.sprite = sprite;
  }

  update(time: number, delta: number) {
    if (this.sprite.y > this.sprite.level.platforms.lowestPlatform + GlobalConfig.world.falldownY) {
      console.log('destroyed through fall down');
      this.sprite.destroy();
    }
  }
}
