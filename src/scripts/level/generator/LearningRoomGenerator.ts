import { LevelController } from '../LevelController';
import { AnswerBoxLogic } from '../logic/AnswerBoxLogic';
import { BlackboardLogic } from '../logic/BlackboardLogic';
import { QuestionMasterLogic } from '../logic/QuestionMasterLogic';
import { LevelGenerator } from './LevelGenerator';

export class LearningRoomGenerator extends LevelGenerator {
  generate(level: LevelController): void {
    const base = level.platforms.createPlatform(0, 0);

    const blackboard = new BlackboardLogic(0, -100);
    const answerBoxLogic = new AnswerBoxLogic(blackboard);
    const questionMaster = new QuestionMasterLogic(
      blackboard,
      answerBoxLogic,
      base.displayWidth / 2 - 2 * level.hero.displayWidth,
      0
    );
    level.addLogic(blackboard);
    level.addLogic(answerBoxLogic);
    level.addLogic(questionMaster);

    const hero = level.hero;
    hero.setVelocity(0, 0);
    hero.flipX = true;
    hero.setPosition(base.displayWidth / 2 - 2 * level.hero.displayWidth, 0);
    level.setCameraOffset(0, 100);
  }
}
