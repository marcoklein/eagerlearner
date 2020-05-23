import { DestroyOnFallDownComponent } from './components/DestroyOnFallDownComponent';
import { HandComponent } from './components/HandComponent';
import { PlayerControlComponent } from './components/PlayerControlComponent';
import { GameScene } from '../scenes/GameScene';
import { Actor } from './Actor';
import { GlobalConfig } from '../Globals';

export class Hero extends Actor {
  scene: GameScene;
  hands: HandComponent;
  control: PlayerControlComponent;
  fallDownDestroy: DestroyOnFallDownComponent;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'player.body');
    this.scene = scene;
    this.hands = new HandComponent(this.scene, this, { key: 'player.hand' });
    this.control = new PlayerControlComponent(this.scene, this);
    this.fallDownDestroy = new DestroyOnFallDownComponent(scene, this);

    this.setOrigin(0.5, 1);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.hands.update(time, delta);
    this.control.update(time, delta);
    this.fallDownDestroy.update(time, delta);
  }

  destroy() {
    super.destroy();
    this.hands.destroy();
  }
}
