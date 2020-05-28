import { LevelController } from '../LevelController';
import { LevelLogic } from './LevelLogic';
import { IntroPart } from '../parts/IntroPart';

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
  credits: Phaser.GameObjects.Text | undefined;

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
    this.teacher = level.scene.add.image(-250 - IntroPart.RIGHT_OFFSET, 0, 'learn.teacher');
    this.teacher.setOrigin(0.5, 1);
    this.teacher.setDepth(-10);

    this.showText('Choose');
  }

  onDetach(level: LevelController): void {
    this.blackboard.destroy();
    this.teacher.destroy();
    this.textObject?.destroy();
    this.credits?.destroy();
  }

  showText(text: string, fontSize: number = 42) {
    if (this.textObject) {
      this.textObject.destroy();
    }
    const topCenter = this.blackboard.getTopCenter();
    this.textObject = this.level.scene.add.text(topCenter.x, topCenter.y + this.blackboard.height * 0.2, text);
    this.textObject.setOrigin(0.5, 0);
    this.textObject.setFontSize(fontSize);
    this.textObject.setAlign('center');
    this.textObject.setFontStyle('bold');
    this.textObject.setDepth(-50);
  }

  showCredits() {
    const bottomLeft = this.blackboard.getBottomLeft();
    this.credits = this.level.scene.add.text(bottomLeft.x + 8, bottomLeft.y - 8, 'by Marco Klein', {
      fontStyle: 'bold',
      fontSize: 18,
      color: '#FFF',
    });
    this.credits.setOrigin(0, 1);
    this.credits.setDepth(-50);
  }

  update(level: LevelController, time: number, delta: number) {}
}
