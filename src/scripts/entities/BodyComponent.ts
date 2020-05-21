import HandComponent from "./HandComponent";

export default class BodyComponent {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.sprite = this.initSprite(scene, x, y);
  }

  private initSprite(scene: Phaser.Scene, x: number, y: number) {
    const sprite = scene.physics.add.sprite(x, y, 'player.body');
    scene.add.existing(sprite);

    sprite.setCollideWorldBounds(true);

    return sprite;
  }

  update(time: number, delta: number) {
  }

}
