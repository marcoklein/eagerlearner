import { LevelPart } from "./LevelPart";
import { LevelController } from "../LevelController";
import { PartGenerationParams } from "./GenerationParams";
import { BlackboardLogic } from "../logic/BlackboardLogic";
import { AnswerBoxLogic } from "../logic/AnswerBoxLogic";
import { QuestionMasterLogic } from "../logic/QuestionMasterLogic";
import { Random } from "../generator/Random";

/**
 * Hero can pick a new gun.
 */
export class LootPart extends LevelPart {

  
  static create() {
    return new LootPart();
  }

  append(level: LevelController, params: PartGenerationParams, prevPlatformX: number, prevPlatformY: number) {
    prevPlatformX += Random.between(50, 100);
    const base = level.platforms.createPlatform(prevPlatformX, prevPlatformY);

    const blackboard = new BlackboardLogic(base.getTopCenter().x, base.getTopCenter().y - 100);
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

    // const hero = level.hero;
    // hero.setVelocity(0, 0);
    // hero.flipX = true;
    // hero.setPosition(base.displayWidth / 2 - 2 * level.hero.displayWidth, 0);
    // level.setCameraOffset(0, 100);

    return base;
  }

}