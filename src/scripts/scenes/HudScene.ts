import FpsText from '../objects/fpsText';
import { GameScene } from './GameScene';
import { LevelState } from '../level/LevelController';

export class HudScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  deadMessage: Phaser.GameObjects.Text;
  grayOverlay: Phaser.GameObjects.Graphics;
  deadGroup: Phaser.GameObjects.Group;

  gameScene: GameScene;

  constructor() {
    super({ key: 'HudScene' });
  }

  create() {
    this.gameScene = this.scene.get('GameScene') as GameScene;
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);

    this.deadMessage = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Ooops ... you exploded', {
        color: '#000',
        fontStyle: 'bold',
        fontSize: 72,
      })
      .setOrigin(0.5, 0.5);

    this.grayOverlay = this.add.graphics();
    this.grayOverlay.fillStyle(0xffffff, 0.5);
    this.grayOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.grayOverlay.setDepth(-100);

    this.deadGroup = this.add.group([this.deadMessage, this.grayOverlay]);
    this.deadGroup.setVisible(false);
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);

    this.deadGroup.setVisible(this.gameScene.level.state === LevelState.DEAD);
  }

  showDeadMessage() {}
}
