import 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { GlobalConfig } from './Globals';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: GlobalConfig.physics.gravity },
    },
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
