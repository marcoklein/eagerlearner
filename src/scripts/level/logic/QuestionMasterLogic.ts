import { Hero } from '../../actors/Hero';
import { EffectStatus } from '../../actors/projectile/effects/ProjectileEffect';
import { Projectile } from '../../actors/projectile/Projectile';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { LevelController } from '../LevelController';
import { AnswerBoxLogic } from './AnswerBoxLogic';
import { BlackboardLogic } from './BlackboardLogic';
import { LevelLogic } from './LevelLogic';
import { Random } from '../Random';

/**
 * Main controller for questions.
 * Shows questions and spawns a door if they have been answered successfully.
 */
export class QuestionMasterLogic extends LevelLogic {
  level: LevelController;
  blackboard: BlackboardLogic;
  answers: AnswerBoxLogic;

  solutionLeftOrRight: boolean;

  doorX: number;
  doorY: number;

  constructor(blackboard: BlackboardLogic, answers: AnswerBoxLogic, doorX: number, doorY: number) {
    super();
    this.blackboard = blackboard;
    this.answers = answers;
    this.doorX = doorX;
    this.doorY = doorY;
  }

  onAttach(level: LevelController) {
    this.level = level;

    this.createMathQuestion();
  }

  onDetach(level: LevelController): void {}

  update(level: LevelController, time: number, delta: number) {}

  createMathQuestion() {
    const left = Phaser.Math.Between(0, 9);
    const right = Phaser.Math.Between(0, 9);
    const plusOrMinus = Phaser.Math.Between(0, 1) ? true : false;
    const symbol = plusOrMinus ? '+' : '-';
    const questionText = `${left} ${symbol} ${right} = ?`;
    this.blackboard.showText(questionText);

    const solution = plusOrMinus ? left + right : left - right;
    let wrongResult = solution;
    while (wrongResult === solution) {
      wrongResult = Phaser.Math.Between(Math.max(solution - 10, 1), Math.min(solution + 10, 99));
    }
    this.solutionLeftOrRight = Phaser.Math.Between(0, 1) === 0;

    if (this.solutionLeftOrRight) {
      // solution left
      this.answers.createAnswerBoxes('' + solution, this.onRightAnswer, '' + wrongResult, this.onWrongAnswer);
    } else {
      // solution right
      this.answers.createAnswerBoxes('' + wrongResult, this.onWrongAnswer, '' + solution, this.onRightAnswer);
    }
  }

  onRightAnswer = (projectile: Projectile, hero: Hero) => {
    // spawn door and loot
    this.giveHeroBetterItem();
    this.spawnDoorToActionWorld();
    this.answers.destroyBoxes();
    this.level.sounds.playSound('yess');
    return EffectStatus.DESTROY;
  };

  onWrongAnswer = (projectile: Projectile, hero: Hero) => {
    // hero.reduceLife();
    this.spawnDoorToActionWorld();
    this.answers.destroyBoxes();
    this.level.sounds.playSound('noo');
    return EffectStatus.DESTROY;
  };

  /**
   * TODO in future we may spawn to items so the player can choose and pick
   */
  giveHeroBetterItem() {
    this.level.hero.hands.equip(WearableFactory.createRandomGun());
    this.level.hero.hands.ammo += Random.between(20, 30);
  }

  // TODO handling the "right answer" should be extracted into a different component
  spawnDoorToActionWorld() {
    this.level.addDoor(this.doorX, this.doorY);
  }
}
