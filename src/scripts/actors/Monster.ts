import { TextureKey, GlobalConfig } from '../Globals';
import { GameScene } from '../scenes/GameScene';
import { DestroyOnFallDownComponent } from './components/DestroyOnFallDownComponent';
import { HandComponent } from './components/HandComponent';
import { MonsterLogic } from './monster/ai/MonsterLogic';
import { Actor } from './Actor';
import { LevelController } from '../level/LevelController';

export class Monster extends Actor {
  scene: GameScene;
  hands: HandComponent;
  controls: MonsterLogic[] = [];
  body: Phaser.Physics.Arcade.Body;
  fallDownDestroy: DestroyOnFallDownComponent;

  constructor(level: LevelController, x: number, y: number, texture: TextureKey) {
    super(level, x, y, texture.key, texture.frame);
    this.hands = new HandComponent(this.scene, this, { key: 'monster.hand' });
    this.fallDownDestroy = new DestroyOnFallDownComponent(this.scene, this);
    this.setOrigin(0.5, 1);

    // NOTE: physical attributes are overriden and handled by the MonsterSpawner static group
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  addLogic(control: MonsterLogic) {
    control.attach(this);
    this.controls.push(control);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.hands.update(time, delta);
    this.controls.forEach((control) => control.update(this, time, delta));
    this.fallDownDestroy.update(time, delta);
  }

  destroy() {
    super.destroy();
    this.hands.destroy();
  }
}
