import { GlobalConfig, TextureKey } from '../../../Globals';
import { LevelController } from '../../../level/LevelController';
import { ObjectCache } from '../../../ObjectCache';
import { Actor } from '../../Actor';
import { ThrowBackEffect } from '../../projectile/effects/ThrowBackEffect';
import { Grenade } from '../../projectile/Grenade';
import { GunFireLogic } from './GunFireLogic';

export class GrenadeFireLogic implements GunFireLogic {
  readonly texture: TextureKey;

  constructor(texture: TextureKey) {
    this.texture = texture;
  }

  fire(level: LevelController, x: number, y: number, owner: Actor) {
    const vec = ObjectCache.vectorA;
    vec.set(1, 0);
    vec.scale(GlobalConfig.bullets.speed);
    const rotation = -45;
    vec.setAngle(Phaser.Math.DEG_TO_RAD * (owner.flipX ? rotation - 90 : rotation));

    const builder = level.projectiles.newBuilder();
    builder.effect(new ThrowBackEffect());
    builder.lifetime(1000);
    builder.owner(owner);
    builder.texture(this.texture);
    builder.type(new Grenade(vec.clone(), this.texture));
    const bullet = builder.spawn(x, y);
    bullet.body.setAngularVelocity(180);
  }
}
