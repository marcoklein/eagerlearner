import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Punch } from '../../actors/wearables/Punch';
import { LevelController } from '../LevelController';
import { LevelLogic } from '../logic/LevelLogic';
import { Platform } from '../platforms/Platform';
import { GenerationParams } from './GenerationParams';
import { IntroPart } from './IntroPart';
import { LevelPart } from './LevelPart';
import { SinglePlatformPart } from './SinglePlatformPart';
import { AttackOnPlayerSight } from '../../actors/monster/ai/AttackOnPlayerSight';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';

export class LevelGenerator extends LevelLogic {
  level: LevelController;
  prevPlatform: Platform;
  params: GenerationParams = {
    platforms: {
      gap: {
        x: {
          min: 0,
          max: 100,
        },
        y: {
          min: -150,
          max: 400,
        },
      },
      size: {
        width: {
          min: 200,
          max: 500,
        },
      },
    },
    parts: {
      size: {
        width: {
          min: 1000,
          max: 1000,
        },
      },
    },
    monsters: [],
  };

  constructor() {
    super();
  }

  onAttach(level: LevelController): void {
    this.level = level;
    const introPart = IntroPart.create();

    this.appendPart(introPart);

    // generate monsters
    this.params.monsters.push(
      new MonsterSpawner(level.spawner)
        .texture({ key: 'monster.1' })
        .equip(WearableFactory.createPunch())
        .logic(new LookToPlayerLogic())
        .logic(new PatrolLogic())
        .logic(new AttackOnPlayerSight(200, 2000))
    );
  }

  onDetach(level: LevelController): void {}

  update(level: LevelController, time: number, delta: number): void {
    // generate
    // smooth scroll of camera
    this.adjustCamScroll(level);
    if (level.hero.x > this.prevPlatform.getLeftCenter().x - this.level.scene.cameras.main.width) {
      this.appendPart(SinglePlatformPart.create());
    }
  }

  /**
   * Cam is initially a little bit over the player and moves into center
   * of player when leaving the intro platform.
   * @param level 
   */
  private adjustCamScroll(level: LevelController) {
    const camDownScrollX = 400;
    const camIntroY = 100;
    const camXTarget = 800;
    const camYTarget = level.hero.displayHeight / 2;
    let camY = camYTarget;
    if (level.hero.x < camDownScrollX) {
      camY = camIntroY;
    } else if (level.hero.x < camXTarget) {
      const m = (camYTarget - camIntroY) / (camXTarget - camDownScrollX)
      camY = m * (level.hero.x - camDownScrollX) + camIntroY;
    }
    level.setCameraOffset(0, camY);
  }

  appendPart(part: LevelPart) {
    let x, y: number;
    if (!this.prevPlatform) {
      x = 0;
      y = 0;
    } else {
      const topRight = this.prevPlatform.getTopRight();
      x = topRight.x;
      y = topRight.y;
    }
    this.prevPlatform = part.append(this.level, this.params, x, y);
  }
}
