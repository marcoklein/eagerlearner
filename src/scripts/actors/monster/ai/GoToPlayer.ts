import { MonsterLogic } from './MonsterLogic';
import { Monster } from '../../Monster';
import { GlobalConfig } from '../../../Globals';

/**
 * Follows player, always moving to his position.
 */
export class FollowPlayerLogic extends MonsterLogic {
  onAttach(monster: Monster) {}
  onDetach(monster: Monster) {}

  update(monster: Monster, time: number, delta: number) {
    const player = monster.scene.level.hero;

    // move into player direction
    monster.flipX = player.x < monster.x;
    const isFlipped = monster.flipX;

    monster.move(GlobalConfig.monsters.speed);

    // "stand up"
    // if negative angle rotate to left
    // if positive angle rotate to right
    let rotVel = 1;
    const curAngle = monster.angle;
    // const controllableAngleSpeedRange;
    if (curAngle < 0) rotVel = -rotVel;
    // this.monstear.body.setAngularVelocity(PhaserUtils.setValueWithMax(rotVel, this.monster.body.angularVelocity));
    // console.log(this.monster.body.angularVelocity, curAngle);
  }
}
