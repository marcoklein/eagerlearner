import { MonsterLogic } from './components/MonsterLogic';
import { Actor } from './Actor';
import { BodyComponent, TextureKey } from './components/BodyComponent';
import { HandComponent } from './components/HandComponent';
import { Breed } from './Breed';
import { GameScene } from '../scenes/GameScene';

export class Monster extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  hands: HandComponent;
  control: MonsterLogic;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: GameScene, x: number, y: number, texture: TextureKey) {
    super(scene, x, y, texture.key, texture.frame);
    this.scene = scene;
    this.hands = new HandComponent(this.scene, this, { key: 'monster.hand' });
    this.control = new MonsterLogic(this);

    // NOTE: physical attributes are overriden and handled by the MonsterSpawner static group
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.hands.update(time, delta);
    this.control.update(time, delta);
    
  }
}
