import { GameScene } from '../scenes/GameScene';
import { Monster } from '../actors/Monster';
import { TextureKey } from '../Globals';
import { Wearable } from '../actors/wearables/Wearable';
import { MonsterSpawner } from './MonsterSpawner';
import { MonsterLogic } from '../actors/ai/MonsterLogic';

export class MonsterBuilder {
  spawner: MonsterSpawner;
  _texture: TextureKey | undefined;
  _logics: MonsterLogic[];
  wearable: Wearable | undefined;

  constructor(spawner: MonsterSpawner) {
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

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    const monster = new Monster(this.spawner.scene, x, y, this._texture);
    if (this.wearable) monster.hands.equip(this.wearable);
    this._logics.forEach((logic) => monster.addLogic(logic));
    this.spawner.spawnMonster(monster);
  }
}
