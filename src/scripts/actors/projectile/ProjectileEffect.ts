import { Hero } from '../Hero';
import { Monster } from '../Monster';
import { Projectile } from './Projectile';

export enum EffectStatus {
  /**
   * Do nothing.
   */
  NONE = 0,
  /**
   * Consume effect and remove it from list of effects.
   * If all effects are gone the owner is removed.
   */
  CONSUME,
  /**
   * Destroy the effect owner.
   */
  DESTROY,
}

export abstract class ProjectileEffect {
  /**
   * Apply effect to hero. Return true to destroy the projectile.
   *
   * @param projectile
   * @param hero
   */
  abstract applyToHero(projectile: Projectile, hero: Hero): EffectStatus;

  /**
   * Apply effect to a monster. Return true to destroy the projectile.
   *
   * @param projectile
   * @param hero
   */
  abstract applyToMonster(projectile: Projectile, monster: Monster): EffectStatus;

  applyToWall(projectile: Projectile, wall: Phaser.Physics.Arcade.Sprite) {
    return EffectStatus.DESTROY; // destroy per default
  }
}
