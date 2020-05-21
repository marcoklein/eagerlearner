import { GameScene } from '../../scenes/GameScene';
import { TextureKey } from '../../Globals';
import { Monster } from '../Monster';
import { Projectile } from './Projectile';
import { ProjectileType } from './ProjectileType';

/**
 * Something that flys and has an effect on collision.
 */
export class Bullet extends ProjectileType {
  private velocity: Phaser.Math.Vector2;

  constructor(velocity: Phaser.Math.Vector2) {
    super();
    this.velocity = velocity;
  }

  setupPhysicalAttributes(projectile: Projectile): void {
    console.log('bullet')
    projectile.flipX = this.velocity.x < 0;
    projectile.depth = -1;
    projectile.setVelocity(this.velocity.x, this.velocity.y);
    projectile.setGravityY(-projectile.scene.physics.world.gravity.y); // shoot straight
  }
}
