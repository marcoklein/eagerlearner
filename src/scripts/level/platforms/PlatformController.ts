import { GlobalConfig } from '../../Globals';
import { Platform } from './Platform';

export class PlatformController {
  scene: Phaser.Scene;
  readonly group: Phaser.Physics.Arcade.StaticGroup;
  lowestPlatform: number = GlobalConfig.world.falldownY;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.group = this.scene.physics.add.staticGroup({
      classType: Platform
    });
  }

  createPlatform(x: number, y: number, width?: number, height?: number) {
    const platform = this.scene.physics.add.staticSprite(x, y, 'world.platform');
    platform.setOrigin(0, 0);
    if (width) platform.displayWidth = width;
    if (height) platform.displayHeight = height;
    platform.refreshBody();
    // platform.setFriction(0.7, 0.7);
    this.group.add(platform);

    if (y >= this.lowestPlatform) {
      this.lowestPlatform = y;
    }

    return platform;
  }

  findPlatformUnderneath(x: number, y: number) {
    return (<Platform[]> this.group.children.entries)
      .find(p => x >= p.x && x <= p.x + p.displayWidth);
  }

  reset() {
    this.lowestPlatform = GlobalConfig.world.falldownY;
  }
}
