import FpsText from '../objects/fpsText';

export class HudScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'HudScene' });
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
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);
  }
}
