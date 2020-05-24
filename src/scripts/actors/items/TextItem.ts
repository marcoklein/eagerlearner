import { Projectile } from '../projectile/Projectile';
import { Item } from './Item';

/**
 * Item with text inside.
 */
export class TextItem extends Item {
  text: string;
  textObject: Phaser.GameObjects.Text;
  initX: number;
  initY: number;

  constructor(text: string) {
    super();
    this.text = text;
  }

  setupPhysicalAttributes(projectile: Projectile): void {
    const centerPos = projectile.getCenter();
    this.textObject = projectile.scene.add.text(centerPos.x, centerPos.y, this.text);
    this.textObject.setOrigin(0.5, 0.5);
    this.textObject.setFontSize(26);
    projectile.setGravityY(-projectile.scene.physics.world.gravity.y); // stay in air
    this.initX = projectile.x;
    this.initY = projectile.y;
  }

  onUpdate(time: number, delta: number, projectile: Projectile) {
    projectile.x = this.initX; // hard setting the location here until we have an item system
    projectile.y = this.initY;
  }

  onDestroy(projectile: Projectile): void {
    this.textObject.destroy();
  }
}
