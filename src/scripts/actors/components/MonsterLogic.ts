import { Monster } from '../Monster';
import { globals } from '../../Globals';

export class MonsterLogic {
  monster: Monster;

  constructor(monster: Monster) {
    this.monster = monster;
  }

  update(time: number, delta: number) {
    const player = this.monster.scene.player;

    // move into player direction
    this.monster.flipX = player.x < this.monster.x;
    const isFlipped = this.monster.flipX;

    // move
    const maxSpeed = globals.monsters.speed;
    // range where speed can be directly adjusted
    // movement speed may be adjusted from 110 directly to -110 for example
    const controllableSpeedRange = maxSpeed * 1.2;
    const curVel = this.monster.body.velocity.x;
    if (Math.abs(curVel) < controllableSpeedRange) {
      // we can set the velocity :)
      const moveVel = isFlipped ? -maxSpeed : maxSpeed;
      this.monster.setVelocityX(moveVel);
    }

    // "stand up"
    // if negative angle rotate to left
    // if positive angle rotate to right
    let rotVel = 1;
    const curAngle = this.monster.angle;
    // const controllableAngleSpeedRange;
    if (curAngle < 0) rotVel = -rotVel;
    // this.monstear.body.setAngularVelocity(PhaserUtils.setValueWithMax(rotVel, this.monster.body.angularVelocity));
    // console.log(this.monster.body.angularVelocity, curAngle);
  }
}

export class PhaserUtils {
  static setValueWithMax(val: number, cur: number) {
    return val > 0 ? Math.min(val, cur) : Math.max(val, cur);
  }
}
