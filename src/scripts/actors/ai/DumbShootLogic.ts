import { MonsterLogic } from './MonsterLogic';
import { Monster } from '../Monster';
import { Globals } from '../../Globals';

/**
 * Shoots :)
 */
export class DumbShootLogic extends MonsterLogic {
  onAttach(monster: Monster) {}

  onDetach(monster: Monster) {}

  update(monster: Monster, time: number, delta: number) {
    monster.hands.action();
  }
}
