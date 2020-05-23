import { DestroyOnFallDownComponent } from './components/DestroyOnFallDownComponent';
import { HandComponent } from './components/HandComponent';
import { PlayerControlComponent } from './components/PlayerControlComponent';
import { GameScene } from '../scenes/GameScene';
import { Actor } from './Actor';
import { GlobalConfig } from '../Globals';
import { LevelController } from '../level/LevelController';

export class Hero extends Actor {
  hands: HandComponent;
  control: PlayerControlComponent;
  fallDownDestroy: DestroyOnFallDownComponent;

  constructor(level: LevelController, x: number, y: number) {
    super(level, x, y, 'player.body');
    this.hands = new HandComponent(this.scene, this, { key: 'player.hand' });
    this.control = new PlayerControlComponent(this.scene, this);
    this.fallDownDestroy = new DestroyOnFallDownComponent(this.scene, this);

    this.setOrigin(0.5, 1);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.hands.update(time, delta);
    this.control.update(time, delta);
    this.fallDownDestroy.update(time, delta);
  }

  destroy() {
    console.log('hero fell down if there is no explosion message yet');
    super.destroy();
    this.hands.destroy();
  }
}
