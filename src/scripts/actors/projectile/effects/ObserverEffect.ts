import { ProjectileEffect, EffectStatus } from './ProjectileEffect';
import { Projectile } from '../Projectile';
import { Monster } from '../../Monster';
import { Hero } from '../../Hero';

/**
 * Get notified if this projectile hits something.
 */
export class ObserverEffect extends ProjectileEffect {
  observers: ProjectileEffect[] = [];

  constructor(observer?: ProjectileEffect) {
    super();
    if (observer) {
      this.observers = [observer];
    }
  }

  applyToHero(projectile: Projectile, hero: Hero): EffectStatus {
    this.observers.forEach((o) => o.applyToHero(projectile, hero));
    return EffectStatus.NONE;
  }

  applyToMonster(projectile: Projectile, monster: Monster): EffectStatus {
    this.observers.forEach((o) => o.applyToMonster(projectile, monster));
    return EffectStatus.NONE;
  }

  applyToWall(projectile: Projectile, wall: Phaser.Physics.Arcade.Sprite) {
    this.observers.forEach((o) => o.applyToWall(projectile, wall));
    return EffectStatus.NONE;
  }

  addObserver(observer: ProjectileEffect) {
    this.observers.push(observer);
  }
}
