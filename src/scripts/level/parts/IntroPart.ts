import { LevelPart } from './LevelPart';
import { Platform } from '../platforms/Platform';
import { LevelController } from '../LevelController';
import { BlackboardLogic } from '../logic/BlackboardLogic';
import { Random } from '../Random';
import { PartGenerationParams } from './GenerationParams';
import { LevelLogic } from '../logic/LevelLogic';

export class IntroPart extends LevelPart {
  static RIGHT_OFFSET = 200;

  blackboard: BlackboardLogic;
  base: Platform;

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
  append(level: LevelController, params: PartGenerationParams, prevPlatformX: number, prevPlatformY: number) {
    this.base = level.platforms.createPlatform(-350 - IntroPart.RIGHT_OFFSET, 0, 800);

    const playedAlready = !!level.highscore;

    this.blackboard = new BlackboardLogic(-IntroPart.RIGHT_OFFSET, -100);
    level.addLogic(this.blackboard);
    const introMsgs = ['Have fun eager learner!', 'Welcome back...', 'That was close', "Keep goin'!", "It ain't easy"];
    const introMsg = playedAlready ? Random.element(introMsgs) : introMsgs[0];

    let blackboardIntro = `${introMsg}\n\nA / D = move\nW = jump\nSPACE = attack`;

    const highscore = level.highscore;
    if (highscore) {
      blackboardIntro = `${introMsg}\n\nA / D = move\nW = jump\nSPACE = attack\n\nHighscore: ${highscore}`;
    }

    this.blackboard.showText(blackboardIntro, 28);
    this.blackboard.showCredits();

    const hero = level.hero;
    hero.setVelocity(0, 0);
    hero.flipX = true;
    hero.setPosition(this.base.getTopCenter().x, 0);

    return this.base;
  }

  destroy(level: LevelController): void {
    this.base.destroy();
    level.removeLogic(this.blackboard);
  }
}
