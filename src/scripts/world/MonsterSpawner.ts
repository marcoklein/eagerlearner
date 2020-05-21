import { Monster } from '../actors/Monster';
import { GameScene } from '../scenes/GameScene';
import { Globals } from '../Globals';

export class MonsterSpawner {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      dragX: Globals.monsters.dragX,
      angularDrag: 200,
      mass: Globals.monsters.mass,
    });
  }

  spawnMonster(x: number, y: number) {
    const monster = new Monster(this.scene, x, y, { key: 'monster.1' });

    // monster.body.sprite.setFriction(0.7, 0);
    this.group.add(monster);
  }
}
