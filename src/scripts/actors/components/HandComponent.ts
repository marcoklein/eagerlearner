import { TextureKey } from '../../Globals';

/**
 * Controls hands.
 */
export class HandComponent {
  scene: Phaser.Scene;

  leftHand: Phaser.GameObjects.Sprite;
  rightHand: Phaser.GameObjects.Sprite;

  body: Phaser.Physics.Arcade.Sprite;

  // temp vectors
  private bodyCenter = new Phaser.Math.Vector2();
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

  constructor(scene: Phaser.Scene, body: Phaser.Physics.Arcade.Sprite, texture: TextureKey) {
    this.scene = scene;
    this.body = body;
    this.initHands(texture);
  }

  private initHands(texture: TextureKey) {
    this.leftHand = this.createHand(texture);
    this.rightHand = this.createHand(texture);
  }

  private createHand(texture: TextureKey) {
    const sprite = this.scene.add.sprite(this.body.x, this.body.y, texture.key, texture.frame);
    sprite.setDepth(this.body.depth + 1); // render in front of body
    this.scene.add.existing(sprite);
    return sprite;
  }

  update(time: number, delta: number) {
    this.body.getCenter(this.bodyCenter);

    if (this.hitting) {
      // update hit
      this.hitTime += delta;

      // check for collision/hit
      // avoid hitting while our hand is moving back
      if (this.hitTime < this.hitDuration / 2) {
        this.rightHand.getCenter(this.rightHandCenter);
        const hits = <Phaser.Physics.Arcade.Body[]>(
          this.scene.physics.overlapCirc(
            this.rightHandCenter.x,
            this.rightHandCenter.y,
            this.leftHand.width / 2,
            true,
            false
          )
        );
        hits.forEach((body) => {
          if (body === this.body.body) return; // own body
          if (this.hits.indexOf(body) !== -1) return; // already hit
          this.hits.push(body);
          let vel = 300;
          body.velocity.x += this.body.flipX ? -vel : vel;
          body.velocity.y += -vel * 0.1;
          // body.angularVelocity += this.body.flipX ? -45 : 45;
        });
      }
      if (this.hitTime > this.hitDuration) {
        this.hitTime = 0;
        this.hitting = false;
      }
    }

    // move left hand
    let leftHandX = this.body.width / 3.5 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration);
    if (this.body.flipX) leftHandX *= -1;
    this.leftHand.setPosition(this.bodyCenter.x + leftHandX, this.bodyCenter.y + 1);

    // move right hand
    let rightHandX =
      this.body.width / 1.8 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration);
    if (this.body.flipX) rightHandX *= -1;
    this.rightHand.setPosition(this.bodyCenter.x + rightHandX, this.bodyCenter.y - 3);
  }

  private calculateHitHandPosition(time: number, maxX: number, duration: number) {
    const turnTime = duration / 2;
    const opening = -maxX / (turnTime * turnTime);
    const inner = time - turnTime;
    return opening * (inner * inner) + maxX;
  }

  hit() {
    if (!this.hitting) {
      this.hitting = true;
      this.hits = [];
    }
  }
}
