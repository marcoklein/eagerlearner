import { LevelPart } from './LevelPart';
import { LevelController } from '../LevelController';
import { GenerationParams } from './GenerationParams';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Platform } from '../platforms/Platform';
import { Random } from '../generator/Random';

/**
 * Creates one platform of random length.
 */
export class SinglePlatformPart extends LevelPart {
  static create() {
    return new SinglePlatformPart();
  }

  append(level: LevelController, params: GenerationParams, prevPlatformX: number, prevPlatformY: number) {
    const platParams = params.platforms;

    const rnd = (min: number, max: number) => Phaser.Math.Between(min, max);
    // params for initial platform
    let nextX = rnd(prevPlatformX + platParams.gap.x.min, prevPlatformX + platParams.gap.x.max);
    let nextY = rnd(prevPlatformY + platParams.gap.y.min, prevPlatformY + platParams.gap.y.max);
    let nextWidth = rnd(platParams.size.width.min, platParams.size.width.max); // ensure first platform is large enough

    const platform = level.platforms.createPlatform(nextX, nextY, nextWidth);

    // spawn monster

    // maybe spawn monster on platform
    if (
      platform.displayWidth > 500 || // always spawn on large platforms
      Math.random() < 0.5
    ) {
      // spawn monster
      const spawner = Random.element(params.monsters);
      const monster = spawner.spawn(platform);
      console.log('spawned monster');

      // Random.element(options.monsterCreation)(level, platform, monster);
    }

    return platform;
  }
}
