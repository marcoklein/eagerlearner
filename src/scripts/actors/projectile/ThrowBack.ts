import { Actor } from '../Actor';
import { Hero } from '../Hero';
import { Monster } from '../Monster';
import { Projectile } from './Projectile';
import { ProjectileEffect } from './ProjectileEffect';

export class ThrowBack extends ProjectileEffect {
  applyToHero(projectile: Projectile, hero: Hero) {
    return this.throwBack(projectile, hero);
  }

  applyToMonster(projectile: Projectile, monster: Monster) {
    return this.throwBack(projectile, monster);
  }

  private throwBack(projectile: Projectile, actor: Actor) {
    console.log('throw back');
    const physicsBody = actor.body;
    physicsBody.velocity.y += -50;

    return true;
  }
}
