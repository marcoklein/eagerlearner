import { BodyComponent } from "./BodyComponent";

/**
 * Performs actions on a body like moving or jumping.
 */
export class MoveComponent {
  scene: Phaser.Scene;
  
  leftHand: Phaser.Physics.Arcade.Sprite;
  rightHand: Phaser.Physics.Arcade.Sprite;

  body: BodyComponent;

  // temp vectors
  private tempVec = new Phaser.Math.Vector2();
  private tempVec2 = new Phaser.Math.Vector2();

  constructor(scene: Phaser.Scene, body: BodyComponent) {
    this.scene = scene;
    this.body = body;
    this.initHands();
  }

  private initHands() {
    const scene = this.scene;
    this.leftHand = this.createHand();
    this.rightHand = this.createHand();
  }

  private createHand() {
    const sprite = this.scene.physics.add.sprite(this.body.sprite.x, this.body.sprite.y, 'player.hand');
    sprite.setDepth(this.body.sprite.depth + 1); // render in front of body
    sprite.setGravity(0, 0);
    this.scene.add.existing(sprite);
    return sprite;
  }

  update() {

    // move left hand
    this.body.sprite.getCenter(this.tempVec);
    this.leftHand.getCenter(this.tempVec2);
    this.scene.physics.moveTo(this.leftHand, this.tempVec.x, this.tempVec.y, this.tempVec.subtract(this.tempVec2).lengthSq());
    // move right hand
    this.body.sprite.getCenter(this.tempVec);
    this.leftHand.getCenter(this.tempVec2);
    this.scene.physics.moveTo(this.rightHand, this.tempVec.x + this.body.sprite.width / 2, this.tempVec.y, this.tempVec.subtract(this.tempVec2).lengthSq());
    
  }
}
