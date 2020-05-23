import { Projectile } from '../projectile/Projectile';
import { Item } from './Item';

/**
 * Item with text inside.
 */
export class TextItem extends Item {
  text: string;
  textObject: Phaser.GameObjects.Text;

  constructor(text: string) {
    super();
    this.text = text;
  }

  setupPhysicalAttributes(projectile: Projectile): void {
    const centerPos = projectile.getCenter();
    this.textObject = projectile.scene.add.text(centerPos.x, centerPos.y, this.text);
    this.textObject.setOrigin(0.5, 0.5);
    this.textObject.setFontSize(26);
  }

  onUpdate(time: number, delta: number, projectile: Projectile) {
    this.textObject.x = projectile.x;
    this.textObject.y = projectile.y;
  }

  onDestroy(projectile: Projectile): void {
    this.textObject.destroy();
  }
}
