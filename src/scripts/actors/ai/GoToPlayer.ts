import { MonsterLogic } from './MonsterLogic';
import { Monster } from '../Monster';
import { GlobalConfig } from '../../Globals';

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

    // move
    const maxSpeed = GlobalConfig.monsters.speed;
    // range where speed can be directly adjusted
    // movement speed may be adjusted from 110 directly to -110 for example
    const controllableSpeedRange = maxSpeed * 1.2;
    const curVel = monster.body.velocity.x;
    if (Math.abs(curVel) < controllableSpeedRange) {
      // we can set the velocity :)
      const moveVel = isFlipped ? -maxSpeed : maxSpeed;
      monster.setVelocityX(moveVel);
    }

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
