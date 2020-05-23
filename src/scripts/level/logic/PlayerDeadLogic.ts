import { LevelLogic } from './LevelLogic';
import { LevelController, LevelState } from '../LevelController';
import { HudScene } from '../../scenes/HudScene';

/**
 * Listens for Hero destroy and activates the "player dead" state.
 */
export class PlayerDeadLogic extends LevelLogic {
  level: LevelController;

  callback = () => {
    console.log('player dead');
    this.level.changeState(LevelState.DEAD);

    setTimeout(() => {
      this.level.restartGame();
    }, 3000);
  };
  onAttach(level: LevelController): void {
    this.level = level;
    level.hero.on('destroy', this.callback, this);
  }
  onDetach(level: LevelController): void {
    level.hero.off('destroy', this.callback, this);
  }
  update(level: LevelController, time: number, delta: number): void {}
}
