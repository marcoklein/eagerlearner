import { DestroyOnFallDownComponent } from './components/DestroyOnFallDownComponent';
import { HandComponent } from './components/HandComponent';
import { PlayerControlComponent } from './components/PlayerControlComponent';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  hands: HandComponent;
  control: PlayerControlComponent;
  fallDownDestroy: DestroyOnFallDownComponent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player.body');
    this.scene = scene;
    this.hands = new HandComponent(this.scene, this, { key: 'player.hand' });
    this.control = new PlayerControlComponent(this.scene, this);

    this.fallDownDestroy = new DestroyOnFallDownComponent(scene, this);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.hands.update(time, delta);
    this.control.update(time, delta);
    this.fallDownDestroy.update(time, delta);
  }
}
