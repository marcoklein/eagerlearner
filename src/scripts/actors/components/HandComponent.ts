import { TextureKey } from '../../Globals';
import { Wearable } from '../wearables/Wearable';
import { Punch } from '../wearables/Punch';
import { GameScene } from '../../scenes/GameScene';
import { Actor } from '../Actor';

/**
 * Controls hands.
 */
export class HandComponent {
  scene: GameScene;

  leftHand: Phaser.GameObjects.Sprite;
  rightHand: Phaser.GameObjects.Sprite;

  body: Actor;

  /**
   * Something held in the hands.
   */
  wearable: Wearable;

  defaultWearable = new Punch();

  bodyCenter = new Phaser.Math.Vector2();

  constructor(scene: GameScene, body: Actor, texture: TextureKey) {
    this.scene = scene;
    this.body = body;
    this.initHands(texture);
    this.equip(this.defaultWearable);
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

  equip(wearable: Wearable) {
    if (this.wearable) {
      // change wearable
      this.wearable.unequip(this);
    }
    this.wearable = wearable;
    this.wearable.equip(this);
  }

  unequip() {
    if (this.wearable) this.wearable.unequip(this);
    this.equip(this.defaultWearable);
  }

  update(time: number, delta: number) {
    this.wearable.update(this, time, delta);
    this.body.getCenter(this.bodyCenter);
    const positions = this.wearable.calculateHandPositions(this, this.body);
    this.leftHand.x = this.bodyCenter.x + (this.body.flipX ? -positions.left.x : positions.left.x);
    this.leftHand.y = this.bodyCenter.y + positions.left.y;
    this.rightHand.x = this.bodyCenter.x + (this.body.flipX ? -positions.right.x : positions.right.x);
    this.rightHand.y = this.bodyCenter.y + positions.right.y;
  }

  action() {
    this.wearable.useAction();
  }

  destroy() {
    this.wearable.unequip(this);
    this.leftHand.destroy();
    this.rightHand.destroy();
  }
}
