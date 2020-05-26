import { LevelController } from '../LevelController';
import { Platform } from '../platforms/Platform';
import { GenerationParams } from './GenerationParams';

/**
 * Part / module of a complete level.
 * Always has one starting and one ending platform
 */
export abstract class LevelPart {
  protected constructor() {}

  /**
   * A level consists out of multiple level parts.
   * Each level part is responsible of appending itself to already existing parts.
   *
   * @param level
   * @param prevPlatformX The platform x-coordinate of the previous platform.
   * @return The new platform to calc next x and y values.
   */
  abstract append(
    level: LevelController,
    params: GenerationParams,
    prevPlatformX: number,
    prevPlatformY: number
  ): Platform;
}
