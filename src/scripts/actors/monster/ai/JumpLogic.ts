import { MonsterLogic } from "./MonsterLogic";
import { Monster } from "../../Monster";
import { Random } from "../../../level/generator/Random";

/**
 * Jumps :)
 */
export class JumpLogic extends MonsterLogic {
  cooldown = 0;
  speed: number;
  minSpeed: number;
  maxSpeed: number;

  constructor(jumpSpeedMin: number, jumpSpeedMax: number) {
    super();
    this.minSpeed = jumpSpeedMin;
    this.maxSpeed = jumpSpeedMax;
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
      monster.jump();
    } else {
      this.cooldown -= delta;
    }
  }
}
