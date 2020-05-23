import { Monster } from '../../Monster';
import { MonsterLogic } from './MonsterLogic';

/**
 * Shoots :)
 */
export class AttackOnPlayerSight extends MonsterLogic {
  cooldown = 0;
  speed: number;

  constructor(attackSpeed: number) {
    super();
    this.speed = attackSpeed;
  }

  onAttach(monster: Monster) {
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
