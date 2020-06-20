import { ProjectileType } from './ProjectileType';
import { Projectile } from './Projectile';
import { ShotgunFireLogic } from '../wearables/logics/ShotgunFireLogic';
import { TextureKey, GlobalConfig } from '../../Globals';
import { ObjectCache } from '../../ObjectCache';
import { Random } from '../../level/Random';
import { ThrowBackEffect } from './effects/ThrowBackEffect';
import { NoGravityBullet } from './NoGravityBullet';

export class Grenade extends ProjectileType {
  private velocity: Phaser.Math.Vector2;
  private explosionTexture: TextureKey;

  constructor(velocity: Phaser.Math.Vector2, explosionTexture: TextureKey) {
    super();
    this.velocity = velocity;
    this.explosionTexture = explosionTexture;
  }

  setupPhysicalAttributes(projectile: Projectile): void {
    projectile.flipX = this.velocity.x < 0;
    projectile.depth = -1;
    projectile.setVelocity(this.velocity.x, this.velocity.y);
  }

  onDestroy(projectile: Projectile): void {
    const vec = ObjectCache.vectorA;
    vec.set(1, 0);
    vec.scale(GlobalConfig.bullets.speed);
    for (let rotation = 0; rotation < 180; rotation += Random.between(4, 6)) {
      vec.setAngle(rotation);
      const builder = projectile.scene.level.projectiles.newBuilder();
      builder.effect(new ThrowBackEffect());
      builder.lifetime(150);
      builder.owner(projectile.owner);
      builder.texture(this.explosionTexture);
      builder.type(new NoGravityBullet(vec.clone()));
      const bullet = builder.spawn(projectile.x, projectile.y);
      bullet.body.setAngularVelocity(180);
    }
  }

  onUpdate(time: number, delta: number, projectile: Projectile) {}
}
