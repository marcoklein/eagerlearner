import { MonsterLogic } from './MonsterLogic';
import { Monster } from '../Monster';

export class LookToPlayerLogic extends MonsterLogic {
  onAttach(monster: Monster) {}
  onDetach(monster: Monster) {}

  update(monster: Monster, time: number, delta: number) {
    const player = monster.scene.level.hero;

    // move into player direction
    monster.flipX = player.x < monster.x;
    const isFlipped = monster.flipX;
  }
}
