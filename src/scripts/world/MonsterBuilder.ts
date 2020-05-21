import { GameScene } from "../scenes/GameScene";
import { Monster } from "../actors/Monster";
import { TextureKey } from "../Globals";
import { Wearable } from "../actors/components/Wearable";
import { MonsterSpawner } from "./MonsterSpawner";

export class MonsterBuilder {
  spawner: MonsterSpawner;
  _texture: TextureKey | undefined;
  wearable: Wearable | undefined;

  constructor(spawner: MonsterSpawner) {
    this.spawner = spawner;
  }

  reset() {
    this._texture = undefined;
    this.wearable = undefined;
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

  spawn(x: number, y: number) {
    if (!this._texture) throw new Error('Texture needed');
    const monster = new Monster(this.spawner.scene, x, y, this._texture);
    if (this.wearable) monster.hands.equip(this.wearable);
    this.spawner.spawnMonster(monster);
  }
  
}