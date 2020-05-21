import Player from "./BodyComponent";

/**
 * Controls hands.
 */
export default class HandComponent {
  scene: Phaser.Scene;
  
  leftHand: Phaser.GameObjects.Sprite;
  rightHand: Phaser.GameObjects.Sprite;

  body: Player;

  // temp vectors
  private bodyCenter = new Phaser.Math.Vector2();

  // action
  hitting = false;
  private hitTime = 0;
  private hitDuration = 200;
  private hitMaxX = 50;

  constructor(scene: Phaser.Scene, body: Player) {
    this.scene = scene;
    this.body = body;
    this.initHands();
  }

  private initHands() {
    this.leftHand = this.createHand();
    this.rightHand = this.createHand();
  }

  private createHand() {
    const sprite = this.scene.add.sprite(this.body.sprite.x, this.body.sprite.y, 'player.hand');
    sprite.setDepth(this.body.sprite.depth + 1); // render in front of body
    this.scene.add.existing(sprite);
    return sprite;
  }

  update(time: number, delta: number) {
    this.body.sprite.getCenter(this.bodyCenter);

    if (this.hitting) {
      // update hit
      this.hitTime += delta;


      if (this.hitTime > this.hitDuration) {
        this.hitTime = 0;
        this.hitting = false;
      }
    }
    
    // move left hand
    this.leftHand.setPosition(
      this.bodyCenter.x - this.body.sprite.width / 4 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration),
      this.bodyCenter.y + 1
    );

    // move right hand
    this.rightHand.setPosition(
      this.bodyCenter.x + this.body.sprite.width / 2 + this.calculateHitHandPosition(this.hitTime, this.hitMaxX, this.hitDuration),
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
