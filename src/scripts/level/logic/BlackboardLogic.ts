import { LevelLogic } from './LevelLogic';
import { LevelController } from '../LevelController';

/**
 * Adds a blackboard with questions.
 */
export class BlackboardLogic extends LevelLogic {
  x: number;
  y: number;
  blackboard: Phaser.GameObjects.Image;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  onAttach(level: LevelController) {
    this.blackboard = level.scene.add.image(this.x, this.y, 'learn.blackboard');
    this.blackboard.setOrigin(0.5, 1);
  }

  onDetach(level: LevelController): void {
    this.blackboard.destroy();
  }

  update(level: LevelController, time: number, delta: number) {}
}
