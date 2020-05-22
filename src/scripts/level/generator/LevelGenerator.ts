import { LevelController } from '../LevelController';

export abstract class LevelGenerator {
  abstract generate(level: LevelController): void;
}
