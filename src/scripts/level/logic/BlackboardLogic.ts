import { LevelController } from '../LevelController';
import { LevelLogic } from './LevelLogic';

/**
 * Adds a blackboard with questions.
 */
export class BlackboardLogic extends LevelLogic {
  level: LevelController;
  x: number;
  y: number;
  blackboard: Phaser.GameObjects.Image;
  teacher: Phaser.GameObjects.Image;
  textObject: Phaser.GameObjects.Text | undefined;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  onAttach(level: LevelController) {
    this.level = level;
    this.blackboard = level.scene.add.image(this.x, this.y, 'learn.blackboard');
    this.blackboard.setOrigin(0.5, 1);
    this.blackboard.setDepth(-100);
    this.teacher = level.scene.add.image(-250, 0, 'learn.teacher');
    this.teacher.setOrigin(0.5, 1);
    this.teacher.setDepth(-10);

    this.showText('Choose');
  }

  onDetach(level: LevelController): void {
    this.blackboard.destroy();
    this.teacher.destroy();
    this.textObject?.destroy();
  }

  showText(text: string) {
    if (this.textObject) {
      this.textObject.destroy();
    }
    const topCenter = this.blackboard.getTopCenter();
    this.textObject = this.level.scene.add.text(topCenter.x, topCenter.y + this.blackboard.height * 0.2, text);
    this.textObject.setOrigin(0.5, 0);
    this.textObject.setFontSize(42);
    this.textObject.setFontStyle('bold');
  }

  update(level: LevelController, time: number, delta: number) {}
}
