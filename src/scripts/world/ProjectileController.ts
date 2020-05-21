import { Bullet } from '../actors/projectile/Bullet';
import { Projectile } from '../actors/projectile/Projectile';
import { ProjectileBuilder } from '../actors/projectile/ProjectileBuilder';
import { ThrowBackEffect } from '../actors/projectile/ThrowBackEffect';
import { GlobalConfig, TextureKey } from '../Globals';
import { GameScene } from '../scenes/GameScene';

/**
 * Manages everything that generally flys around in the world and has some effect on actors.
 */
export class ProjectileController {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;
  builder = new ProjectileBuilder(this);

  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      allowGravity: false,
    });
  }

  addProjectile(projectile: Projectile) {
    this.group.add(projectile);
    projectile.setupPhysicalAttributes();
  }

  fireBullet(x: number, y: number, velocity: Phaser.Math.Vector2, texture: TextureKey) {
    this.builder.reset().effect(new ThrowBackEffect()).texture(texture).type(new Bullet(velocity)).spawn(x, y);
  }
}
