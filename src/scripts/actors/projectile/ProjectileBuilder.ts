import { GameScene } from '../../scenes/GameScene';
import { ProjectileController } from '../../world/ProjectileController';
import { Projectile } from './Projectile';
import { TextureKey, GlobalConfig } from '../../Globals';
import { ProjectileType } from './ProjectileType';
import { ProjectileEffect } from './ProjectileEffect';

export class ProjectileBuilder {
  readonly controller: ProjectileController;
  private _type: ProjectileType | undefined;
  private _texture: TextureKey | undefined;
  private _lifetime: number;
  private effects: ProjectileEffect[] = [];

  constructor(projectileController: ProjectileController) {
    this.controller = projectileController;
  }

  reset() {
    this.effects = [];
    this._texture = undefined;
    this._type = undefined;
    this._lifetime = GlobalConfig.bullets.lifetime;
    return this;
  }

  type(type: ProjectileType) {
    this._type = type;
    return this;
  }

  texture(texture: TextureKey) {
    this._texture = texture;
    return this;
  }

  effect(effect: ProjectileEffect) {
    this.effects.push(effect);
    return this;
  }

  lifetime(time: number) {
    this._lifetime = time;
    return this;
  }

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    if (!this._type) throw new Error('Type needed');
    const projectile = new Projectile(this.controller.scene, x, y, this._texture, this._type);
    projectile.lifetime = this._lifetime;
    this.effects.forEach((effect) => projectile.addEffect(effect));
    this.controller.addProjectile(projectile);
    return this;
  }
}
