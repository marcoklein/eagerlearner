import { TextureKey, GlobalConfig } from '../../../Globals';
import { LevelController } from '../../../level/LevelController';
import { Actor } from '../../Actor';
import { GunFireLogic } from './GunFireLogic';
import { Gun } from '../Gun';

export class StraightGunShot implements GunFireLogic {
  readonly texture: TextureKey;

  constructor(texture: TextureKey) {
    this.texture = texture;
  }

  fire(level: LevelController, x: number, y: number, owner: Actor) {
    const vel = new Phaser.Math.Vector2(owner.flipX ? -GlobalConfig.bullets.speed : GlobalConfig.bullets.speed, 0);
    level.projectiles.fireBullet(x, y, vel, this.texture, owner);
  }
}
