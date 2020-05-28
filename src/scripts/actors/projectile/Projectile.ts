import { TextureKey, GlobalConfig } from '../../Globals';
import { GameScene } from '../../scenes/GameScene';
import { ProjectileEffect, EffectStatus } from './effects/ProjectileEffect';
import { ProjectileType } from './ProjectileType';
import { Hero } from '../Hero';
import { Monster } from '../Monster';
import { Actor } from '../Actor';
import { Platform } from '../../level/platforms/Platform';

/**
 * Something that flys and has an effect on collision.
 */
export class Projectile extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  projectileType: ProjectileType;
  effects: ProjectileEffect[] = [];

  lifetime: number = GlobalConfig.bullets.lifetime;

  /**
   * The shooter.
   */
  owner: Actor;

  body: Phaser.Physics.Arcade.Body;

  constructor(scene: GameScene, x: number, y: number, texture: TextureKey, type: ProjectileType, owner: Actor) {
    super(scene, x, y, texture.key, texture.frame);

    this.setOrigin(0.5, 0.5);
    this.projectileType = type;
    this.owner = owner;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.projectileType.onUpdate(time, delta, this);
    this.lifetime -= delta;
    // auto kill if it doesnt collide after time
    if (this.lifetime < 0) {
      this.destroy();
    }
  }

  setupPhysicalAttributes() {
    this.projectileType.setupPhysicalAttributes(this);
  }

  addEffect(effect: ProjectileEffect) {
    this.effects.push(effect);
  }

  onHeroCollision(hero: Hero) {
    // if (hero === this.owner) return;
    let destroy = false;
    this.effects = this.effects.filter((effect) => {
      const status = effect.applyToHero(this, hero);
      destroy = destroy || status === EffectStatus.DESTROY;
      return status === EffectStatus.NONE;
    });
    if (destroy || !this.effects.length) {
      this.destroy();
    }
  }

  onMonsterCollision(monster: Monster) {
    if (!GlobalConfig.monsters.killEachOther && this.owner instanceof Monster) return;
    let destroy = false;
    this.effects = this.effects.filter((effect) => {
      const status = effect.applyToMonster(this, monster);
      destroy = destroy || status === EffectStatus.DESTROY;
      return status === EffectStatus.NONE;
    });
    if (destroy || !this.effects.length) {
      this.destroy();
    }
  }

  onWallCollision(wall: Platform) {
    let destroy = false;
    this.effects = this.effects.filter((effect) => {
      const status = effect.applyToWall(this, wall);
      destroy = destroy || status === EffectStatus.DESTROY;
      return status === EffectStatus.NONE;
    });
    if (destroy || !this.effects.length) {
      this.destroy();
    }
  }

  destroy() {
    if (this.scene) {
      // may already be removed
      this.projectileType.onDestroy(this);
      this.scene.level.particles.emitParticles(this.x, this.y, this.texture.key);
    }
    super.destroy();
  }
}
