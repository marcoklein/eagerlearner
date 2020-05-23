import { LevelController } from '../../../level/LevelController';
import { Gun } from '../Gun';
import { Actor } from '../../Actor';
import { GunFireLogic } from './GunFireLogic';
import { TextureKey, GlobalConfig } from '../../../Globals';
import { ThrowBackEffect } from '../../projectile/effects/ThrowBackEffect';
import { NoGravityBullet } from '../../projectile/NoGravityBullet';
import { ObjectCache } from '../../../ObjectCache';

export class ShotgunFireLogic implements GunFireLogic {
  readonly texture: TextureKey;

  constructor(texture: TextureKey) {
    this.texture = texture;
  }

  fire(level: LevelController, gun: Gun, x: number, y: number, owner: Actor) {
    // gun.gunSprite.flipX ? -GlobalConfig.bullets.speed : GlobalConfig.bullets.speed,

    const vec = ObjectCache.vectorA;
    for (let rotation = 0; rotation < 180; rotation += 10) {
      (<any>vec).setAngle(gun.gunSprite.flipX ? -rotation : rotation);
      const builder = level.projectiles.newBuilder();
      builder.effect(new ThrowBackEffect());
      builder.lifetime(1000);
      builder.owner(owner);
      builder.texture(this.texture);
      builder.type(new NoGravityBullet(vec.clone()));
    }
  }
}
