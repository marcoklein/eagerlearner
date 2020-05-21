import { BodyComponent, TextureKey } from './BodyComponent';

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
      if (this.hitTime > this.hitDuration) {
        this.hitTime = 0;
        this.hitting = false;
      }

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
          body.setVelocityX(300);
        });
      }
    }

    // move left hand
    this.leftHand.setPosition(
      this.bodyCenter.x -
        this.body.width / 4 +
        this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration),
      this.bodyCenter.y + 1
    );

    // move right hand
    this.rightHand.setPosition(
      this.bodyCenter.x +
        this.body.width / 2 +
        this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration),
      this.bodyCenter.y
    );
  }

  private calculateHitHandPosition(time: number, maxX: number, duration: number) {
    const turnTime = duration / 2;
    const opening = -maxX / (turnTime * turnTime);
    const inner = time - turnTime;
    return opening * (inner * inner) + maxX;
  }

  hit() {
    this.hitting = true;
  }
}
