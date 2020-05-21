import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import Player from '../entities/Player';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  player: Player;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);
    
    this.player = new Player(this, this.cameras.main.width / 2, 0);
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);
    this.player.update(time, delta);
  }
}
