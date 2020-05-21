import { Wearable, HandPositions } from './Wearable';
import { HandComponent } from './HandComponent';

export class Punch extends Wearable {
  // temp vectors
  private rightHandCenter = new Phaser.Math.Vector2();

  // action
  hitting = false;
  private hitTime = 0;
  private hitDuration = 200;
  private hitMaxX = 50;
  /**
   * Avoid double hits.
   */
  private hits: Phaser.Physics.Arcade.Body[];

  onEquip(hands: HandComponent): void {}
  onUnequip(hands: HandComponent): void {}

  useAction() {
    if (!this.hitting) {
      this.hitting = true;
      this.hits = [];
    }
  }
  update(hands: HandComponent, time: number, delta: number) {
    const scene = hands.scene;
    const leftHand = hands.leftHand;
    const rightHand = hands.rightHand;
    if (this.hitting) {
      // update hit
      this.hitTime += delta;

      // check for collision/hit
      // avoid hitting while our hand is moving back
      if (this.hitTime < this.hitDuration / 2) {
        rightHand.getCenter(this.rightHandCenter);
        const hits = <Phaser.Physics.Arcade.Body[]>// TODO just check with a rectangle if we hit something
        scene.physics.overlapCirc(this.rightHandCenter.x, this.rightHandCenter.y, leftHand.width / 2, true, false);
        hits.forEach((body) => {
          if (body === hands.body.body) return; // own body
          if (this.hits.indexOf(body) !== -1) return; // already hit
          this.hits.push(body);
          let vel = 300;
          body.velocity.x += hands.body.flipX ? -vel : vel;
          body.velocity.y += -vel * 0.1;
          // body.angularVelocity += this.body.flipX ? -45 : 45;
        });
      }
      if (this.hitTime > this.hitDuration) {
        this.hitTime = 0;
        this.hitting = false;
      }
    }
  }

  calculateHandPositions(hands: HandComponent, body: Phaser.Physics.Arcade.Sprite): HandPositions {
    // move left hand
    let leftHandX = body.width / 3.5 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration);
    // move right hand
    let rightHandX = body.width / 1.8 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration);

    return {
      left: {
        x: leftHandX,
        y: 1,
      },
      right: {
        x: rightHandX,
        y: -3,
      },
    };
  }

  private calculateHitHandPosition(time: number, maxX: number, duration: number) {
    const turnTime = duration / 2;
    const opening = -maxX / (turnTime * turnTime);
    const inner = time - turnTime;
    return opening * (inner * inner) + maxX;
  }
}
