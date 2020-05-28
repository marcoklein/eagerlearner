import { Hero } from '../actors/Hero';
import { Monster } from '../actors/Monster';
import { Projectile } from '../actors/projectile/Projectile';
import { LevelController } from './LevelController';
import { Actor } from '../actors/Actor';
import { ObjectCache } from '../ObjectCache';

export class CollisionController {
  constructor(level: LevelController) {
    this.init(level);
  }

  private init(level: LevelController) {
    const scene = level.scene;
    scene.physics.add.collider(scene.level.heroGroup, scene.level.platforms.group);
    scene.physics.add.collider(scene.level.spawner.group, scene.level.platforms.group);
    scene.physics.add.collider(scene.level.spawner.group, scene.level.heroGroup, (a, b) => {
      // monster - player collision
      if (a instanceof Actor && b instanceof Actor) {
        if (a.getBottomCenter().y < b.getTopCenter().y + 4) {
          a.jump();
          b.reduceLife();
        } else if (b.getBottomCenter().y < a.getTopCenter().y + 4) {
          b.jump();
          a.reduceLife();
        }
      }
    });

    scene.physics.add.overlap(scene.level.projectiles.group, scene.level.projectiles.group, (a, b) => {
      // destroy bullets on collision
      if (a instanceof Projectile && b instanceof Projectile) {
        if (a.owner !== b.owner) {
          // dont destroy own projectiles
          a.destroy();
          b.destroy();
        }
      } else {
        throw new Error('Wrong type during collision');
      }
    });

    scene.physics.add.overlap(scene.level.projectiles.group, scene.level.platforms.group, (a, b) => {
      // collided with wall
      if (a instanceof Phaser.Physics.Arcade.Sprite && b instanceof Projectile) {
        b.onWallCollision(a);
      } else if (b instanceof Phaser.Physics.Arcade.Sprite && a instanceof Projectile) {
        a.onWallCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });

    scene.physics.add.overlap(scene.level.projectiles.group, scene.level.spawner.group, (a, b) => {
      // collided with monster
      if (a instanceof Monster && b instanceof Projectile) {
        b.onMonsterCollision(a);
      } else if (b instanceof Monster && a instanceof Projectile) {
        a.onMonsterCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });

    scene.physics.add.overlap(scene.level.projectiles.group, scene.level.heroGroup, (a, b) => {
      // collided with hero
      if (a instanceof Hero && b instanceof Projectile) {
        b.onHeroCollision(a);
      } else if (b instanceof Hero && a instanceof Projectile) {
        a.onHeroCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });
  }
}
