import { Hero } from '../../actors/Hero';
import { TextItem } from '../../actors/items/TextItem';
import { HeroEffect } from '../../actors/projectile/effects/HeroEffect';
import { EffectStatus } from '../../actors/projectile/effects/ProjectileEffect';
import { Projectile } from '../../actors/projectile/Projectile';
import { ProjectileBuilder } from '../../actors/projectile/ProjectileBuilder';
import { LevelController } from '../LevelController';
import { BlackboardLogic } from './BlackboardLogic';
import { LevelLogic } from './LevelLogic';
import { Actor } from '../../actors/Actor';
import { Monster } from '../../actors/Monster';

/**
 * Interface to control answer boxes.
 */
export class AnswerBoxLogic extends LevelLogic {
  level: LevelController;
  blackboard: BlackboardLogic;

  leftBox: Projectile;
  rightBox: Projectile;

  constructor(blackboard: BlackboardLogic) {
    super();
    this.blackboard = blackboard;
  }

  onAttach(level: LevelController) {
    this.level = level;
  }

  onDetach(level: LevelController): void {
    this.destroyBoxes();
  }

  createAnswerBoxes(
    leftText: string,
    leftCallback: (projectile: Projectile, hero: Hero) => EffectStatus,
    rightText: string,
    rightCallback: (projectile: Projectile, hero: Hero) => EffectStatus
  ) {
    if (this.leftBox) this.leftBox.destroy();
    if (this.rightBox) this.rightBox.destroy();
    const bottomLeft = this.blackboard.blackboard.getBottomLeft();
    const bottomRight = this.blackboard.blackboard.getBottomRight();

    // fix until item system is there
    const god = new Monster(this.level, -1000000000, -1000000000, { key: 'god' });
    god.destroy();

    // left
    this.leftBox = new ProjectileBuilder(this.level.projectiles)
      .effect(new HeroEffect(leftCallback))
      .texture({ key: 'learn.box' })
      .type(new TextItem(leftText))
      .owner(god)
      .spawn(bottomLeft.x + 100, bottomLeft.y - 100);

    // right
    this.rightBox = new ProjectileBuilder(this.level.projectiles)
      .effect(new HeroEffect(rightCallback))
      .texture({ key: 'learn.box' })
      .type(new TextItem(rightText))
      .owner(god)
      .spawn(bottomRight.x - 100, bottomRight.y - 100);
  }

  destroyBoxes() {
    if (this.leftBox) this.leftBox.destroy();
    if (this.rightBox) this.rightBox.destroy();
  }

  update(level: LevelController, time: number, delta: number) {}
}
