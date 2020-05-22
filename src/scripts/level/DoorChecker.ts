import { LevelController } from './LevelController';

/**
 * Check if player walks through door.
 */
export class DoorChecker {
  doorBounds = new Phaser.Geom.Rectangle();
  playerBounds = new Phaser.Geom.Rectangle();

  onAttach(level: LevelController) {}

  update(level: LevelController, time: number, delta: number) {
    level.door.getBounds(this.doorBounds);
    level.hero.getBounds(this.playerBounds);
    this.doorBounds.width * 0.5; // make door smaller so player has to walk into it
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.doorBounds, this.playerBounds)) {
      // level finished
      // TODO we may check if the door is closed - feature for later :)
      level.finishLevel();
    }
  }
}
