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
          min: -100,
          max: 200,
        },
      },
      size: {
        width: {
          min: 50,
          max: 200,
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
        .equip(new Punch())
        .logic(new LookToPlayerLogic())
        .logic(new AttackOnPlayerSight(200))
    );
  }
  onDetach(level: LevelController): void {}
  update(level: LevelController, time: number, delta: number): void {
    // generate
    if (level.hero.x > this.prevPlatform.getLeftCenter().x - this.level.scene.cameras.main.width) {
      this.appendPart(SinglePlatformPart.create());
    }
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
