import { LevelController } from '../../../level/LevelController';
import { Gun } from '../Gun';
import { Actor } from '../../Actor';
import { GunFireLogic } from './GunFireLogic';
import { TextureKey, GlobalConfig } from '../../../Globals';
import { ThrowBackEffect } from '../../projectile/effects/ThrowBackEffect';
import { NoGravityBullet } from '../../projectile/NoGravityBullet';
import { ObjectCache } from '../../../ObjectCache';
import { Random } from '../../../level/generator/Random';

export class ShotgunFireLogic implements GunFireLogic {
  readonly texture: TextureKey;

  constructor(texture: TextureKey) {
    this.texture = texture;
  }

  fire(level: LevelController, x: number, y: number, owner: Actor) {
    const vec = ObjectCache.vectorA;
    vec.set(1, 0);
    vec.scale(GlobalConfig.bullets.speed);
    for (let rotation = -15; rotation < 15; rotation += Random.between(4, 6)) {
      vec.setAngle(Phaser.Math.DEG_TO_RAD * (owner.flipX ? rotation - 180 : rotation));
      const builder = level.projectiles.newBuilder();
      builder.effect(new ThrowBackEffect());
      builder.lifetime(1000);
      builder.owner(owner);
      builder.texture(this.texture);
      builder.type(new NoGravityBullet(vec.clone()));
      const bullet = builder.spawn(x, y);
      bullet.body.setAngularVelocity(180);
    }
  }
}
