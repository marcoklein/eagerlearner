import { TextureKey } from '../../Globals';
import { GameScene } from '../../scenes/GameScene';
import { ProjectileEffect } from './ProjectileEffect';
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

  constructor(scene: GameScene, x: number, y: number, texture: TextureKey, type: ProjectileType) {
    super(scene, x, y, texture.key, texture.frame);
    this.projectileType = type;
  }

  setupPhysicalAttributes() {
    this.projectileType.setupPhysicalAttributes(this);
  }

  onHeroCollision(hero: Hero) {
    this.effects = this.effects.filter(effect => !effect.applyToHero(this, hero));
  }

  onMonsterCollision(monster: Monster) {
    this.effects = this.effects.filter(effect => !effect.applyToMonster(this, monster));
  }
  
  onWallCollision(wall: Phaser.Physics.Arcade.StaticBody) {
    this.effects = this.effects.filter(effect => !effect.applyToWall(this, wall));
  }
}
