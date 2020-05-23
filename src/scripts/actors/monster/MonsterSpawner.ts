import { MonsterController } from './MonsterController';
import { TextureKey } from '../../Globals';
import { MonsterLogic } from './ai/MonsterLogic';
import { Wearable } from '../wearables/Wearable';
import { Monster } from '../Monster';

export class MonsterSpawner {
  spawner: MonsterController;
  _texture: TextureKey | undefined;
  _logics: MonsterLogic[];
  wearable: Wearable | undefined;

  constructor(spawner: MonsterController) {
    this.spawner = spawner;
    this.reset();
  }

  reset() {
    this._texture = undefined;
    this.wearable = undefined;
    this._logics = [];
    return this;
  }

  equip(wearable: Wearable) {
    this.wearable = wearable;
    return this;
  }

  texture(texture: TextureKey) {
    this._texture = texture;
    return this;
  }

  logic(logic: MonsterLogic) {
    this._logics.push(logic);
    return this;
  }

  logics(logics: MonsterLogic[]) {
    logics.forEach((l) => this.logic(l));
    return this;
  }

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    const monster = new Monster(this.spawner.level, x, y, this._texture);
    if (this.wearable) monster.hands.equip(Object.create(this.wearable));
    this._logics.forEach((logic) => monster.addLogic(Object.create(logic)));
    this.spawner.spawnMonster(monster);
    return monster;
  }
}
