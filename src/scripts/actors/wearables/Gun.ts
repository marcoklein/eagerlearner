import { GlobalConfig, TextureKey } from '../../Globals';
import { HandComponent } from '../components/HandComponent';
import { GunFireLogic } from './logics/GunFireLogic';
import { HandPositions, Wearable } from './Wearable';

/**
 * Shoots stuff.
 */
export class Gun extends Wearable {
  gunSprite: Phaser.GameObjects.Sprite;
  texture: TextureKey;

  fireBullet = false;
  cooldown = GlobalConfig.weapons.gunCooldown;
  currentCooldown = 0;
  shootAnimationTime = 50;
  shootAnimation = 0;

  fireLogic: GunFireLogic;

  constructor(texture: TextureKey, fireLogic: GunFireLogic) {
    super();
    this.texture = texture;
    this.fireLogic = fireLogic;
  }

  onEquip(hands: HandComponent): void {
    const bodyCenter = hands.body.getCenter();
    this.gunSprite = hands.scene.add.sprite(bodyCenter.x, bodyCenter.y, this.texture.key, this.texture.frame);
  }
  onUnequip(hands: HandComponent): void {
    this.gunSprite.destroy();
  }

  useAction() {
    if (!this.hands) return false;
    const body = this.hands.body;
    if (this.currentCooldown <= 0) {
      // fire
      this.shootAnimation = this.shootAnimationTime;
      this.currentCooldown = this.cooldown;

      this.fireLogic.fire(
        this.hands.scene.level,
        this.gunSprite.x + (body.flipX ? -body.width / 2 : body.width / 2),
        this.gunSprite.y,
        this.hands.body
      );
      return true;
    }
    return false;
  }

  update(hands: HandComponent, time: number, delta: number) {
    if (!this.hands) return;
    const body = this.hands.body;
    const bodyCenter = this.hands.body.getCenter();
    const gunX = 14 + (this.shootAnimation > 0 ? -4 : 0);
    const gunY = 10;
    this.gunSprite.x = bodyCenter.x + (body.flipX ? -gunX : gunX);
    this.gunSprite.y = bodyCenter.y + gunY;

    this.currentCooldown -= delta;
    this.shootAnimation -= delta;
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
      },
    };
  }
}
