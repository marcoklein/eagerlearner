import { LevelGenerator } from './LevelGenerator';
import { LevelController } from '../LevelController';
import { Gun } from '../../actors/wearables/Gun';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';
import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';
import { PlayerDeadLogic } from '../logic/PlayerDeadLogic';
import { Wearable } from '../../actors/wearables/Wearable';
import { Punch } from '../../actors/wearables/Punch';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { MonsterLogic } from '../../actors/monster/ai/MonsterLogic';
import { DumbAttackLogic } from '../../actors/monster/ai/DumbShootLogic';
import { Random } from './Random';

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

    level.setCameraOffset(0, level.hero.height / 2);

    this.createRandomLevel(level); // TODO for testing only
    // if (level.levelNumber <= 1) {
    //   this.createTestLevel(level);
    // } else {
    //   this.createRandomLevel();
    // }
  }

  createTestLevel(level: LevelController) {
    // add platforms and monsters
    // add platforms
    level.platforms.createPlatform(0, 100, 100);
    level.platforms.createPlatform(120, 140, 200);

    const weakMonster = new MonsterSpawner(level.spawner)
      .texture({ key: 'monster.1' })
      // .logic(new LookToPlayerLogic())
      // .logic(new DumbShootLogic())
      .logic(new PatrolLogic(350, 350 + 500))
      // .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1, 3);
    level.platforms.createPlatform(350, 180, 500);

    const standMonster = new MonsterSpawner(level.spawner)
      .texture({ key: 'monster.5' })
      .logic(new LookToPlayerLogic())
      .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1100, 100);
    level.platforms.createPlatform(1000, 180, 500);

    level.addDoor(1200, 180);
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
        maxY: 500,
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
    let nextWidth = rnd(minWidth, maxWidth);

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
      const spawner = this.randomElement(spawners);
      const monster = spawner.spawn(platform.x + rnd(0, platform.displayWidth) - platform.displayWidth / 2, platform.y);
      console.log('spawned monster');

      // add move logic here
      monster.addLogic(new LookToPlayerLogic());
      monster.addLogic(new DumbAttackLogic(Random.between(200, 1000)));
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
      .texture({ key: this.randomElement(availableTextures) })
      .equip(this.randomElement(equipments));
  }

  /**
   * Get random array element.
   *
   * @param array
   */
  private randomElement<T>(array: T[]) {
    return array[Phaser.Math.Between(0, array.length - 1)];
  }
}
