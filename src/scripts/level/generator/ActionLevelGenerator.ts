import { DumbAttackLogic } from '../../actors/monster/ai/DumbShootLogic';
import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Wearable } from '../../actors/wearables/Wearable';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { LevelController } from '../LevelController';
import { LevelGenerator } from './LevelGenerator';
import { Random } from './Random';
import { GlobalConfig } from '../../Globals';

export interface LevelOptions {
  levelWidth: number;
  maxGap: number;
  minY: number;
  maxY: number;
  maxYGap: number;
  minWidth: number;
  maxWidth: number;
}

export class ActionLevelGenerator extends LevelGenerator {
  generate(level: LevelController): void {
    // player start position
    level.hero.x = 0;
    level.hero.y = 0;

    this.createRandomLevel(level);

    level.setCameraOffset(0, level.hero.height / 2);
  }

  createRandomLevel(level: LevelController) {
    const monsterKinds = 5; // random monster breeds
    // TODO with each level one more texture is filtered
    const monsterTextures = ['monster.1', 'monster.5'];
    const wearables = [WearableFactory.createPunch(), WearableFactory.createGun()];
    // const moveLogics = [[new LookToPlayerLogic()], []];
    // const attackLogics = [[new DumbAttackLogic()], [new DumbAttackLogic()]];

    let levelMonsterTextures = monsterTextures.filter((item, index) => index < level.actionLevel);
    let levelWearables = wearables.filter((item, index) => index < level.actionLevel);
    // let levelLogics = moveLogics.filter((item, index) => index < level.actionLevel);
    // let levelAttackLogics = attackLogics.filter((item, index) => index < level.actionLevel);

    console.log('monster textures for level', levelMonsterTextures);
    console.log('monster wearables for level', levelWearables);

    // create random spawners
    let spawners: MonsterSpawner[] = [];
    for (let i = 0; i < monsterKinds; i++) {
      spawners.push(this.createRandomSpawner(level, levelMonsterTextures, levelWearables));
    }

    // create random platforms
    this.createRandomPlatforms(
      level,
      {
        levelWidth: 5000,
        maxGap: 250,
        minY: -500,
        maxY: GlobalConfig.world.falldownY + 50,
        maxYGap: 100,
        minWidth: 100,
        maxWidth: 1000,
      },
      spawners
    );
  }

  private createRandomPlatforms(level: LevelController, options: LevelOptions, spawners: MonsterSpawner[]) {
    const { levelWidth, maxGap, minY, maxY, maxYGap, minWidth, maxWidth } = options;
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
      this.handlePlatformSpawned(level, curPlatform, spawners);
      // succeeding platform params
      nextWidth = rnd(minWidth, maxWidth);
      nextX += (nextWidth + curPlatform.displayWidth) / 2 + rnd(0, maxGap); // left param is min x gap
      nextY = rnd(Math.max(minY, curPlatform.y - maxYGap), Math.min(maxY, curPlatform.y + maxYGap));
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
  handlePlatformSpawned(level: LevelController, platform: Phaser.Physics.Arcade.Sprite, spawners: MonsterSpawner[]) {
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

      // add move logic here
      monster.addLogic(new LookToPlayerLogic());
      monster.addLogic(new DumbAttackLogic(Random.between(1000, 2000)));
      monster.addLogic(new PatrolLogic(platform.x - platform.displayWidth / 2, platform.x + platform.displayWidth / 2));
    }
  }

  private rndBoolean() {
    return Phaser.Math.Between(0, 1) === 0;
  }

  private rndSquared(min: number, max: number) {
    const input = Phaser.Math.Between(min, max);
    const inputMinusMax = input - max;
    const inputSquared = inputMinusMax * inputMinusMax;
    const a = -1 / max;
    return Math.round(a * inputSquared + max);
  }

  private createRandomSpawner(level: LevelController, availableTextures: string[], equipments: Wearable[]) {
    return new MonsterSpawner(level.spawner)
      .texture({ key: Random.element(availableTextures) })
      .equip(Random.element(equipments));
  }
}
