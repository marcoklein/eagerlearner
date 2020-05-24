import { LevelController } from './LevelController';
import { Assets } from '../scenes/PreloadScene';

export class SoundController {
  level: LevelController;
  enabled: boolean;

  constructor(level: LevelController) {
    this.level = level;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  playSound<K extends keyof typeof Assets.sounds>(key: K) {
    if (this.enabled) {
      this.level.scene.sound.play(key, {
        volume: 0.3,
      });
    }
  }
}
