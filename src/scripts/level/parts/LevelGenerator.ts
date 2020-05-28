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
import { JumpLogic } from '../../actors/monster/ai/JumpLogic';

export const BASE_LEVEL_PARAMS: GenerationParams = {
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

export class LevelGenerator extends LevelLogic {
  level: LevelController;
  prevPlatform: Platform;
  params = BASE_LEVEL_PARAMS;
  /**
   * A level is separated into individual sections.
   */
  section = 0;

  constructor() {
    super();
  }

  onAttach(level: LevelController): void {
    this.level = level;
    this.section = 0;
    this.params = BASE_LEVEL_PARAMS;

    // new level

    /** INTRO */
    const introPart = IntroPart.create();
    this.appendPart(introPart);

    /** MONSTER GENERATION */
    const monsterTextures = [
      'monster.1',
      'monster.2',
      'monster.3',
      'monster.4',
      'monster.5',
      'monster.6',
      'monster.7',
      'monster.8',
      'monster.9',
      'monster.0',
    ];
    const wearables = [
      WearableFactory.createPunch(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createPunch(),
      WearableFactory.createEqualGun(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createPlusGun(),
      WearableFactory.createGoodOldBlaster(),
    ];

    // generate monsters
    this.params.monsters = [
      // lvl 1
      MonsterSpawner.create(level.spawner)
        .texture({ key: monsterTextures[0] })
        .equip(WearableFactory.createPunch())
        .logic(new LookToPlayerLogic())
        .logic(new PatrolLogic())
        .logic(new JumpLogic(200, 2000))
        // .logic(new AttackOnPlayerSight(200, 2000)),
      // lvl 2
      // MonsterSpawner.create(level.spawner)
      //   .texture({ key: monsterTextures[1] })
      //   .equip(WearableFactory.createSigmaGun())
      //   .logic(new LookToPlayerLogic())
      //   .logic(new PatrolLogic())
      //   .logic(new AttackOnPlayerSight(1500, 3000)),
      // // lvl 3
      // MonsterSpawner.create(level.spawner)
      //   .texture({ key: monsterTextures[2] })
      //   .equip(WearableFactory.createEqualGun())
      //   .logic(new LookToPlayerLogic())
      //   .logic(new PatrolLogic())
      //   .logic(new AttackOnPlayerSight(1500, 3000)),
      // // lvl 4
      // MonsterSpawner.create(level.spawner)
      //   .texture({ key: monsterTextures[3] })
      //   .equip(WearableFactory.createPlusGun())
      //   .logic(new LookToPlayerLogic())
      //   .logic(new PatrolLogic())
      //   .logic(new AttackOnPlayerSight(2000, 4000)),
    ];
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
      const m = (camYTarget - camIntroY) / (camXTarget - camDownScrollX);
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
