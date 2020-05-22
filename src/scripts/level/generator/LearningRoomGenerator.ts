import { LevelGenerator } from './LevelGenerator';
import { LevelController } from '../LevelController';

export class LearningRoomGenerator extends LevelGenerator {
  generate(level: LevelController): void {
    const base = level.platforms.createPlatform(0, 0);
    console.log('crating learning room', base.displayWidth);
    level.hero.setPosition(base.displayWidth, 0);
  }
}
