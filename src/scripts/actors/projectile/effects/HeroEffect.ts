import { ProjectileEffect, EffectStatus } from './ProjectileEffect';
import { Projectile } from '../Projectile';
import { Hero } from '../../Hero';
import { Monster } from '../../Monster';

/**
 * Single callback function that is called if the Hero collides.
 */
export class HeroEffect extends ProjectileEffect {
  callback: (projectile: Projectile, hero: Hero) => EffectStatus;

  constructor(callback: (projectile: Projectile, hero: Hero) => EffectStatus) {
    super();
    this.callback = callback;
  }

  applyToHero(projectile: Projectile, hero: Hero): EffectStatus {
    return this.callback(projectile, hero);
  }

  applyToMonster(projectile: Projectile, monster: Monster): EffectStatus {
    return EffectStatus.NONE;
  }

  applyToWall(projectile: Projectile, wall: Phaser.Physics.Arcade.Sprite) {
    return EffectStatus.NONE;
  }
}
