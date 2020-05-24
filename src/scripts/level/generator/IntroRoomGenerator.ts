import { LevelGenerator } from './LevelGenerator';
import { LevelController } from '../LevelController';
import { BlackboardLogic } from '../logic/BlackboardLogic';
import { AnswerBoxLogic } from '../logic/AnswerBoxLogic';
import { QuestionMasterLogic } from '../logic/QuestionMasterLogic';
import { Random } from './Random';

/**
 * Our starting room.
 */
export class IntroRoomGenerator extends LevelGenerator {
  private playedAlready = false;

  generate(level: LevelController): void {
    const base = level.platforms.createPlatform(0, 0);

    this.playedAlready = !!level.highscore;

    const blackboard = new BlackboardLogic(0, -100);
    level.addLogic(blackboard);
    const introMsgs = ['Have fun eager learner!', 'Welcome back...', 'That was close', "Keep goin'!", "It ain't easy"];
    const introMsg = this.playedAlready ? Random.element(introMsgs) : introMsgs[0];

    let blackboardIntro = `${introMsg}\n\nA / D = move\nW = jump\nSPACE = attack`;

    const highscore = level.highscore;
    if (highscore) {
      blackboardIntro = `${introMsg}\n\nA / D = move\nW = jump\nSPACE = attack\n\nHighscore: ${highscore}`;
    }

    blackboard.showText(blackboardIntro, 28);
    blackboard.showCredits();

    const hero = level.hero;
    hero.setVelocity(0, 0);
    hero.flipX = true;
    hero.setPosition(base.x, 0);
    level.setCameraOffset(0, 100);

    level.addDoor(base.displayWidth / 2 - 2 * level.hero.displayWidth, 0);
  }
}
