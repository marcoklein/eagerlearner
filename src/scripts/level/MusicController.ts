import { LevelController } from './LevelController';

export class MusicController {
  level: LevelController;
  enabled: boolean;

  playingHomeMusic = false;

  constructor(level: LevelController) {
    this.level = level;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  stopAll() {
    this.level.scene.sound.stopByKey('home');
    this.level.scene.sound.stopByKey('game');
  }

  playHomeMusic() {
    if (this.playingHomeMusic) return;
    this.playingHomeMusic = true;
    this.stopAll();
    this.level.scene.sound.play('home', {
      loop: true,
    });
  }

  playInGameMusic() {
    if (!this.playingHomeMusic) return;
    this.playingHomeMusic = false;
    this.stopAll();
    this.level.scene.sound.play('game', {
      loop: true,
    });
  }
}
