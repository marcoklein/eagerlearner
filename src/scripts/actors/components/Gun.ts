import { Wearable, HandPositions } from "./Wearable";
import { HandComponent } from "./HandComponent";
import { TextureKey } from "../../Globals";


/**
 * Shoots stuff.
 */
export class Gun extends Wearable {

  gunSprite: Phaser.GameObjects.Sprite;
  texture: TextureKey;


  constructor(texture: TextureKey) {
    super();
    this.texture = texture;
  }

  
  onEquip(hands: HandComponent): void {
    const bodyCenter = hands.body.getCenter();
    this.gunSprite = hands.scene.add.sprite(bodyCenter.x, bodyCenter.y, this.texture.key, this.texture.frame);
  }
  onUnequip(hands: HandComponent): void {
    this.gunSprite.destroy();
  }

  useAction() {
    console.log('boom');
  }

  update(time: number, delta: number) {
    if (!this.hands) return;
    const body = this.hands.body;
    const bodyCenter = this.hands.body.getCenter();
    const gunX = 14;
    const gunY = 10;
    this.gunSprite.x = bodyCenter.x + (body.flipX ? -gunX : gunX);
    this.gunSprite.y = bodyCenter.y + gunY;
  }
  
  calculateHandPositions(hands: HandComponent, body: Phaser.Physics.Arcade.Sprite): HandPositions {
    return {
      left: {
        x: -body.width / 2 + 6,
        y: 15,
      },
      right: {
        x: 14,
        y: 14,
      }
    };
  }

  
}