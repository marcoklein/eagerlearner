export abstract class Actor extends Phaser.Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;

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
    console.log(this.body.velocity.x);
  }
}
