import { LevelPart } from './LevelPart';
import { LevelController } from '../LevelController';
import { PartGenerationParams } from './GenerationParams';
import { BlackboardLogic } from '../logic/BlackboardLogic';
import { AnswerBoxLogic } from '../logic/AnswerBoxLogic';
import { QuestionMasterLogic } from '../logic/QuestionMasterLogic';
import { Random } from '../Random';
import { LevelLogic } from '../logic/LevelLogic';
import { Platform } from '../platforms/Platform';

/**
 * Hero can pick a new gun.
 */
export class LootPart extends LevelPart {
  base: Platform;
  logics: LevelLogic[] = [];

  static create() {
    return new LootPart();
  }

  append(level: LevelController, params: PartGenerationParams, prevPlatformX: number, prevPlatformY: number) {
    prevPlatformX += Random.between(50, 100);
    this.base = level.platforms.createPlatform(prevPlatformX, prevPlatformY, 'world.platform');

    const blackboard = new BlackboardLogic(this.base.getTopCenter().x, this.base.getTopCenter().y - 100);
    const answerBoxLogic = new AnswerBoxLogic(blackboard);
    const questionMaster = new QuestionMasterLogic(
      blackboard,
      answerBoxLogic,
      this.base.displayWidth / 2 - 2 * level.hero.displayWidth,
      0
    );
    level.addLogic(blackboard);
    level.addLogic(answerBoxLogic);
    level.addLogic(questionMaster);

    this.logics = [blackboard, answerBoxLogic, questionMaster];

    return this.base;
  }

  destroy(level: LevelController): void {
    this.base.destroy();
    this.logics.forEach((l) => level.removeLogic(l));
  }
}
