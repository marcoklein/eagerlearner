import FpsText from '../objects/fpsText';
import { GameScene } from './GameScene';
import { LevelState } from '../level/LevelController';
import { GlobalConfig } from '../Globals';

export class HudScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  deadMessage: Phaser.GameObjects.Text;
  grayOverlay: Phaser.GameObjects.Graphics;
  deadGroup: Phaser.GameObjects.Group;

  gameScene: GameScene;

  levelText: Phaser.GameObjects.Text;
  ammoText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'HudScene' });
  }

  create() {
    this.gameScene = this.scene.get('GameScene') as GameScene;
    if (GlobalConfig.debug.showFps) this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    if (GlobalConfig.debug.showVersion)
      this.add
        .text(this.cameras.main.width - 15, this.cameras.main.height - 15, `v${VERSION}`, {
          color: '#000000',
          fontSize: 18,
        })
        .setOrigin(1, 1);

    this.deadMessage = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Ooops ... you exploded', {
        color: '#000',
        fontStyle: 'bold',
        fontSize: 72,
      })
      .setOrigin(0.5, 0.5);

    this.levelText = this.add
      .text(15, 15, `Level:`, {
        color: '#000000',
        fontStyle: 'bold',
        fontSize: 24,
      })
      .setOrigin(0)
      .setVisible(false);

    this.grayOverlay = this.add.graphics();
    this.grayOverlay.fillStyle(0xffffff, 0.5);
    this.grayOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.grayOverlay.setDepth(-100);

    this.deadGroup = this.add.group([this.deadMessage, this.grayOverlay]);
    this.deadGroup.setVisible(false);
  }

  update(time: number, delta: number) {
    if (this.fpsText) this.fpsText.update(time, delta);
    this.levelText.visible = this.gameScene.level.actionLevel > 0;
    this.levelText.text = `Level: ${this.gameScene.level.actionLevel}\nAmmo: ${this.gameScene.level.hero.hands.ammo}`;

    this.deadGroup.setVisible(this.gameScene.level.state === LevelState.DEAD);
  }

  showDeadMessage() {}
}
