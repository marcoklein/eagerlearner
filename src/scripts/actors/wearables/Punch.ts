import { Wearable, HandPositions } from './Wearable';
import { HandComponent } from '../components/HandComponent';
import { ObjectCache } from '../../ObjectCache';
import { Actor } from '../Actor';

export class Punch extends Wearable {
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
        let actorPos = ObjectCache.vectorA;
        const hitWidth = 100;
        const hitHeight = hands.body.displayHeight * 0.6;
        if (hands.body.flipX) {
          // hit left
          hands.body.getTopLeft(actorPos);
          actorPos.x -= hitWidth / 2; // adjust center
        } else {
          // hit right
          hands.body.getTopRight(actorPos);
          actorPos.x -= hitWidth / 2; // adjust center
        }
        const hits = <Phaser.Physics.Arcade.Body[]>(
          scene.physics.overlapRect(actorPos.x, actorPos.y, hitWidth, hitHeight, true, false)
        );
        hits.forEach((body) => {
          if (body === hands.body.body) return; // own body
          if (this.hits.indexOf(body) !== -1) return; // already hit
          const actor = body.gameObject;
          if (!(actor instanceof Actor)) return; // hit only Actors

          this.hits.push(body);

          // hit effect => throw back and reduce life
          let vel = 300;
          body.velocity.x += hands.body.flipX ? -vel : vel;
          body.velocity.y += -vel * 0.1;
          actor.reduceLife();
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
