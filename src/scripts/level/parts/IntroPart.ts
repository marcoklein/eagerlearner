import { LevelPart } from './LevelPart';
import { Platform } from '../platforms/Platform';
import { LevelController } from '../LevelController';
import { BlackboardLogic } from '../logic/BlackboardLogic';
import { Random } from '../generator/Random';
import { GenerationParams } from './GenerationParams';

export class IntroPart extends LevelPart {
  static create() {
    return new IntroPart();
  }

  /**
   * Initial part/ intro part.
   * x and y are always 0.
   *
   * @param level
   * @param params
   * @param prevPlatformX
   * @param prevPlatformY
   */
  append(level: LevelController, params: GenerationParams, prevPlatformX: number, prevPlatformY: number) {
    const base = level.platforms.createPlatform(-350, 0, 800);

    const playedAlready = !!level.highscore;

    const blackboard = new BlackboardLogic(0, -100);
    level.addLogic(blackboard);
    const introMsgs = ['Have fun eager learner!', 'Welcome back...', 'That was close', "Keep goin'!", "It ain't easy"];
    const introMsg = playedAlready ? Random.element(introMsgs) : introMsgs[0];

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
    hero.setPosition(base.getTopCenter().x, 0);

    return base;
  }
}
