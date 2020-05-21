import { TextureKey } from '../Globals';
import { GameScene } from '../scenes/GameScene';
import { DestroyOnFallDownComponent } from './components/DestroyOnFallDownComponent';
import { HandComponent } from './components/HandComponent';
import { MonsterLogic } from './components/MonsterLogic';

export class Monster extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  hands: HandComponent;
  control: MonsterLogic;
  body: Phaser.Physics.Arcade.Body;
  fallDownDestroy: DestroyOnFallDownComponent;

  constructor(scene: GameScene, x: number, y: number, texture: TextureKey) {
    super(scene, x, y, texture.key, texture.frame);
    this.scene = scene;
    this.hands = new HandComponent(this.scene, this, { key: 'monster.hand' });
    this.control = new MonsterLogic(this);
    this.fallDownDestroy = new DestroyOnFallDownComponent(scene, this);

    // NOTE: physical attributes are overriden and handled by the MonsterSpawner static group
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
