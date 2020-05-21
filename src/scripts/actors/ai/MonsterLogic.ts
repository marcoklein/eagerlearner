import { Monster } from '../Monster';
import { Globals } from '../../Globals';

export abstract class MonsterLogic {
  monster: Monster | undefined;

  attach(monster: Monster) {
    this.monster = monster;
  }

  detach(monster: Monster) {
    this.monster = undefined;
  }

  abstract onAttach(monster: Monster): void;

  abstract onDetach(monster: Monster): void;

  abstract update(monster: Monster, time: number, delta: number): void;
}
