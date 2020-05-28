import { Monster } from '../../Monster';
import { GlobalConfig } from '../../../Globals';

export abstract class MonsterLogic {
  monster: Monster | undefined;

  attach(monster: Monster) {
    this.monster = monster;
    this.onAttach(monster);
  }

  detach(monster: Monster) {
    this.monster = undefined;
    this.onDetach(monster);
  }

  abstract onAttach(monster: Monster): void;

  abstract onDetach(monster: Monster): void;

  abstract update(monster: Monster, time: number, delta: number): void;
}
