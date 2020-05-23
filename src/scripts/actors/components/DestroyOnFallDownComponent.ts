import { GlobalConfig } from '../../Globals';

export class DestroyOnFallDownComponent {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.sprite = sprite;
  }

  update(time: number, delta: number) {
    if (this.sprite.y > GlobalConfig.world.falldownY) {
      console.log('destroyed through fall down');
      this.sprite.destroy();
    }
  }
}
