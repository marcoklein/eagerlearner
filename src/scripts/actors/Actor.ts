import { LevelController } from '../level/LevelController';
import { GameScene } from '../scenes/GameScene';
import { GlobalConfig } from '../Globals';

export abstract class Actor extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  level: LevelController;
  body: Phaser.Physics.Arcade.Body;

  life = 0;

  constructor(level: LevelController, x: number, y: number, texture: string, frame?: string | number | undefined) {
    super(level.scene, x, y, texture, frame);
    this.level = level;
  }

  jump() {
    if (this.body.touching.down) {
      this.setVelocityY(-GlobalConfig.player.jumpVelocity);
    }
  }

  move(speed: number, directionLeftOrRight: boolean = this.flipX) {
    // move
    const maxSpeed = Math.min(speed);
    // range where speed can be directly adjusted
    // movement speed may be adjusted from 110 directly to -110 for example
    const controllableSpeedRange = maxSpeed * 1.2;
    const curVel = this.body.velocity.x;
    if (Math.abs(curVel) < controllableSpeedRange) {
      // we can set the velocity :)
      const moveVel = directionLeftOrRight ? -maxSpeed : maxSpeed;
      this.setVelocityX(moveVel);
    }
  }

  /**
   * Reduces life by one.
   * Kills the Actor if life drops below 0.
   */
  reduceLife() {
    this.life--;
    if (this.life < 0) {
      this.die();
    }
  }

  die() {
    this.destroy();
  }

  destroy() {
    super.destroy();
    this.level.particles.emitDeathExplosion(this);
  }
}
