import { LevelController } from './LevelController';
import { Assets } from '../scenes/PreloadScene';

export class SoundController {
  level: LevelController;
  omitSoundsFlag: boolean;

  constructor(level: LevelController) {
    this.level = level;
  }

  enable() {
    this.omitSoundsFlag = true;
  }

  disable() {
    this.omitSoundsFlag = false;
  }

  playSound<K extends keyof typeof Assets.sounds>(key: K) {
    if (!this.omitSoundsFlag) {
      this.level.scene.sound.play(key, {
        volume: 0.3,
      });
    }
  }
}
