import { Monster } from '../../actors/Monster';
import { AttackOnPlayerSight } from '../../actors/monster/ai/AttackOnPlayerSight';
import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Wearable } from '../../actors/wearables/Wearable';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { GlobalConfig } from '../../Globals';
import { LevelController } from '../LevelController';
import { Platform } from '../platforms/Platform';
import { LevelGenerator } from './LevelGenerator';
import { Random } from './Random';

export interface MonsterCreationFn {
  (level: LevelController, platform: Platform, monster: Monster): void;
}

export interface WeakLevelOptions {
  name: string;
  levelWidth?: number;
  maxGap?: number;
  minY?: number;
  maxY?: number;
  minYGap?: number;
  maxYGap?: number;
  minWidth?: number;
  maxWidth?: number;
  monsterCreation?: MonsterCreationFn[];
}

export interface LevelOptions extends WeakLevelOptions {
  name: string;
  levelWidth: number;
  maxGap: number;
  minY: number;
  maxY: number;
  minYGap: number;
  maxYGap: number;
  minWidth: number;
  maxWidth: number;
  monsterCreation: MonsterCreationFn[];
}

export const MonsterCreations = {
  patrolling: (level: LevelController, platform: Platform, monster: Monster) => {
    // add move logic here
    monster.addLogic(new LookToPlayerLogic());
    monster.addLogic(new AttackOnPlayerSight(Random.between(1000, 2000)));
    monster.addLogic(new PatrolLogic(platform.x - platform.displayWidth / 2, platform.x + platform.displayWidth / 2));
  },
  standing: (level: LevelController, platform: Platform, monster: Monster) => {
    // add move logic here
    monster.addLogic(new LookToPlayerLogic());
  },
};

export class ActionLevelGenerator extends LevelGenerator {
  generate(level: LevelController): void {
    level.hero.x = 0;
    level.hero.y = 0;

    this.createRandomLevel(level);

    level.setCameraOffset(0, level.hero.height / 2);
  }

  createRandomLevel(level: LevelController) {
    const monsterKinds = 5; // random monster breeds
    // TODO with each level one more texture is filtered
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
    ];
    const wearables = [
      WearableFactory.createPunch(),
      WearableFactory.createEqualGun(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createPlusGun(),
      WearableFactory.createGoodOldBlaster(),
    ];

    // all levels inherit the base attributes
    const baseConfig: LevelOptions = {
      // level 1 (shorter)
      name: 'Base level',
      levelWidth: 4000,
      maxGap: 250,
      minY: -1000,
      maxY: GlobalConfig.world.falldownY - GlobalConfig.world.falldownY,
      minYGap: 0,
      maxYGap: 100,
      minWidth: 100,
      maxWidth: 1000,
      monsterCreation: [MonsterCreations.patrolling],
    };

    const levelConfigs: Array<WeakLevelOptions> = [
      {
        // level 1 (shorter)
        name: 'Level 1',
        levelWidth: 2000,
      },
      {
        // level goes up and down a lot
        name: 'Spam Up and Down',
        maxGap: 150,
        minYGap: 80,
        maxYGap: 150,
        minWidth: 100,
        maxWidth: 1000,
      },
      {
        // level goes up and down a lot
        name: 'Steep and Short',
        minYGap: 100,
        maxYGap: 150,
        minWidth: 100,
        maxWidth: 500,
      },
    ];

    // take level config of current action level .. or pick random one if we have no more defined
    const levelConfig =
      level.actionLevel - 1 >= levelConfigs.length ? Random.element(levelConfigs) : levelConfigs[level.actionLevel - 1];

    let levelMonsterTextures = monsterTextures.filter((item, index) => index < level.actionLevel);
    let levelWearables = wearables.filter((item, index) => index < level.actionLevel);

    console.log('monster textures for level', levelMonsterTextures);
    console.log('monster wearables for level', levelWearables);

    console.log('level name = ', levelConfig.name);
    // create random spawners
    let spawners: MonsterSpawner[] = [];
    for (let i = 0; i < monsterKinds; i++) {
      spawners.push(this.createRandomSpawner(level, levelMonsterTextures, levelWearables));
    }

    const finalConfig = Object.assign(baseConfig, levelConfig);

    // create random platforms
    this.createRandomPlatforms(level, finalConfig, spawners);
  }

  private createRandomPlatforms(level: LevelController, options: LevelOptions, spawners: MonsterSpawner[]) {
    const { levelWidth, maxGap, minY, maxY, minYGap, maxYGap, minWidth, maxWidth } = options;
    const rnd = (min: number, max: number) => Phaser.Math.Between(min, max);
    // params for initial platform
    let nextX = rnd(-100, 100);
    let nextY = rnd(minY, maxY);
    let nextWidth = rnd(Math.max(minWidth, maxWidth * 0.8), maxWidth); // ensure first platform is large enough

    // set hero on initial platform
    level.hero.y = nextY;

    let curPlatform: Phaser.Physics.Arcade.Sprite;
    do {
      curPlatform = level.platforms.createPlatform(nextX, nextY, nextWidth);
      this.handlePlatformSpawned(level, curPlatform, spawners, options);
      // succeeding platform params
      nextWidth = rnd(minWidth, maxWidth);
      nextX += (nextWidth + curPlatform.displayWidth) / 2 + rnd(0, maxGap); // left param is min x gap

      // generate next y
      for (let i = 0; i === 0 || (i < 1000 && Math.abs(curPlatform.y - nextY) < minYGap); i++) {
        nextY = rnd(Math.max(minY, curPlatform.y - maxYGap), Math.min(maxY, curPlatform.y + maxYGap));
      }
    } while (curPlatform.x < levelWidth);

    // add door on last platform
    level.addDoor(curPlatform.x, curPlatform.y);
  }

  /**
   * Called as a new platform is created.
   * Create monsters or stuff on it..
   *
   * @param level
   * @param platform
   */
  handlePlatformSpawned(
    level: LevelController,
    platform: Phaser.Physics.Arcade.Sprite,
    spawners: MonsterSpawner[],
    options: LevelOptions
  ) {
    const rnd = (min: number, max: number) => Random.between(min, max);

    const minPlayerDistance = 300; // spawn monsters not directly in front of player
    if (platform.x < minPlayerDistance) return;

    // maybe spawn monster on platform
    if (
      platform.width > 500 || // always spawn on large platforms
      Math.random() < 0.4
    ) {
      // spawn monster
      const spawner = Random.element(spawners);
      const monster = spawner.spawn(platform.x + rnd(0, platform.displayWidth) - platform.displayWidth / 2, platform.y);
      console.log('spawned monster');

      Random.element(options.monsterCreation)(level, platform, monster);
    }
  }

  private createRandomSpawner(level: LevelController, availableTextures: string[], equipments: Wearable[]) {
    return new MonsterSpawner(level.spawner)
      .texture({ key: Random.element(availableTextures) })
      .equip(Random.element(equipments));
  }
}
