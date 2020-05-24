import { LevelController } from '../../../level/LevelController';
import { Gun } from '../Gun';
import { Actor } from '../../Actor';

export interface GunFireLogic {
  fire(level: LevelController, x: number, y: number, owner: Actor): void;
}
