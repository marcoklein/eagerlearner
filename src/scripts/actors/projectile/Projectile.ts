import { TextureKey, GlobalConfig } from '../../Globals';
import { GameScene } from '../../scenes/GameScene';
import { ProjectileEffect, EffectStatus } from './ProjectileEffect';
import { ProjectileType } from './ProjectileType';
import { Hero } from '../Hero';
import { Monster } from '../Monster';

/**
 * Something that flys and has an effect on collision.
 */
export class Projectile extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  projectileType: ProjectileType;
  effects: ProjectileEffect[] = [];

  lifetime: number = GlobalConfig.bullets.lifetime;

  constructor(scene: GameScene, x: number, y: number, texture: TextureKey, type: ProjectileType) {
    super(scene, x, y, texture.key, texture.frame);
    this.projectileType = type;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
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

  onWallCollision(wall: Phaser.Physics.Arcade.Sprite) {
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
}
