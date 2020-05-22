import { Actor } from '../../Actor';
import { Hero } from '../../Hero';
import { Monster } from '../../Monster';
import { Projectile } from '../Projectile';
import { ProjectileEffect, EffectStatus } from './ProjectileEffect';

export class ThrowBackEffect extends ProjectileEffect {
  applyToHero(projectile: Projectile, hero: Hero) {
    return this.throwBack(projectile, hero);
  }

  applyToMonster(projectile: Projectile, monster: Monster) {
    return this.throwBack(projectile, monster);
  }

  private throwBack(projectile: Projectile, actor: Actor) {
    const physicsBody = actor.body;
    physicsBody.velocity.x += projectile.flipX ? -250 : 250;

    return EffectStatus.DESTROY;
  }
}
