export class PlatformController {
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.StaticGroup;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.group = this.scene.physics.add.staticGroup();
  }

  createPlatform(x: number, y: number) {
    const platform = this.scene.physics.add.staticSprite(x, y, 'world.platform');
    // platform.setFriction(0.7, 0.7);
    this.group.add(platform);
  }
}
