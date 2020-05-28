import { Monster } from '../../Monster';
import { MonsterLogic } from './MonsterLogic';
import { Random } from '../../../level/Random';

/**
 * Shoots :)
 */
export class AttackOnPlayerSight extends MonsterLogic {
  cooldown = 0;
  speed: number;
  minSpeed: number;
  maxSpeed: number;

  constructor(attackSpeedMin: number, attackSpeedMax: number) {
    super();
    this.minSpeed = attackSpeedMin;
    this.maxSpeed = attackSpeedMax;
  }

  onAttach(monster: Monster) {
    this.speed = Random.between(this.minSpeed, this.maxSpeed);
    console.log('attached logic with attack speed', this.speed);
    this.cooldown = Phaser.Math.Between(0, this.speed);
  }

  onDetach(monster: Monster) {}

  update(monster: Monster, time: number, delta: number) {
    if (this.cooldown <= 0) {
      this.cooldown = this.speed;
      monster.hands.action();
    } else {
      this.cooldown -= delta;
    }
  }
}
