import { LevelController } from '../LevelController';
import { LevelLogic } from './LevelLogic';

/**
 * Check if player walks through door.
 */
export class DoorFinishLogic extends LevelLogic {
  doorBounds = new Phaser.Geom.Rectangle();
  playerBounds = new Phaser.Geom.Rectangle();
  x: number;
  y: number;

  /**
   * Exit door of level.
   */
  door: Phaser.GameObjects.Image;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  onAttach(level: LevelController) {
    if (this.door) throw new Error('door already created.');
    this.door = level.scene.add.image(this.x, this.y, 'world.door');
    this.door.setOrigin(0.5, 1);
    this.door.setDepth(-100); // always in background
  }

  onDetach(level: LevelController) {
    this.door.destroy();
  }

  update(level: LevelController, time: number, delta: number) {
    this.doorBounds.setTo(this.door.x, this.door.y, this.door.width * 0.5, this.door.height * 0.5);
    this.playerBounds.setTo(level.hero.x, level.hero.y, level.hero.width * 0.5, level.hero.height * 0.5);
    // make door smaller so player has to walk into it
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.doorBounds, this.playerBounds)) {
      // level finished
      // TODO we may check if the door is closed - feature for later :)
      level.finishLevel();
    }
  }
}
