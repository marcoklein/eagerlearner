import { LevelController } from '../LevelController';

export abstract class LevelLogic {
  abstract onAttach(level: LevelController): void;
  abstract onDetach(level: LevelController): void;
  abstract update(level: LevelController, time: number, delta: number): void;
}
