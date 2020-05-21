import { GameScene } from '../../scenes/GameScene';
import { ProjectileController } from '../../world/ProjectileController';
import { Projectile } from './Projectile';
import { TextureKey } from '../../Globals';
import { ProjectileType } from './ProjectileType';

export class ProjectileBuilder {
  readonly controller: ProjectileController;
  private _type: ProjectileType | undefined;
  private _texture: TextureKey | undefined;

  constructor(projectileController: ProjectileController) {
    this.controller = projectileController;
  }

  reset() {
    this._texture = undefined;
    this._type = undefined;
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

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    if (!this._type) throw new Error('Type needed');
    const projectile = new Projectile(this.controller.scene, x, y, this._texture, this._type);
    return this;
  }
}
