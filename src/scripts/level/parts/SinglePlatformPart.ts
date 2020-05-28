import { LevelPart } from './LevelPart';
import { LevelController } from '../LevelController';
import { PartGenerationParams } from './GenerationParams';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Platform } from '../platforms/Platform';
import { Random } from '../generator/Random';

/**
 * Creates one platform of random length.
 */
export class SinglePlatformPart extends LevelPart {
  platform: Platform;

  static create() {
    return new SinglePlatformPart();
  }

  append(level: LevelController, params: PartGenerationParams, prevPlatformX: number, prevPlatformY: number) {
    const {
      platformGapXMin,
      platformGapXMax,
      platformGapYMin,
      platformGapYMax,
      platformWidthMin,
      platformWidthMax,
    } = params;

    const rnd = (min: number, max: number) => Phaser.Math.Between(min, max);
    // params for initial platform
    let nextX = rnd(prevPlatformX + platformGapXMin, prevPlatformX + platformGapXMax);
    let nextY = rnd(prevPlatformY + platformGapYMin, prevPlatformY + platformGapYMax);
    let nextWidth = rnd(platformWidthMin, platformWidthMax); // ensure first platform is large enough

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

    this.platform = platform;

    return platform;
  }
  destroy(level: LevelController): void {
    this.platform.destroy();
  }
}
