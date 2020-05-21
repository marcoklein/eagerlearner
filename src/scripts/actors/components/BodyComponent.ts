
export interface TextureKey {
  key: string,
  frame?: string,
}

export class BodyComponent {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: TextureKey) {
    this.scene = scene;
    this.sprite = this.initSprite(scene, x, y, texture);
  }

  private initSprite(scene: Phaser.Scene, x: number, y: number, texture: TextureKey) {
    const sprite = scene.physics.add.sprite(x, y, texture.key, texture.frame);
    // sprite.setFriction(0.7, 0.7);
    sprite.setDrag(200, 0);
    scene.add.existing(sprite);

    sprite.setCollideWorldBounds(true);

    return sprite;
  }

  update(time: number, delta: number) {
  }

}
