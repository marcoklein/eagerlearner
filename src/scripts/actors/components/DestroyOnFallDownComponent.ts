export class DestroyOnFallDownComponent {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.sprite = sprite;
  }

  update(time: number, delta: number) {
    if (this.scene.cameras.main.height < this.sprite.y) {
      this.sprite.destroy();
    }
  }
}