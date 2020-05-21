import { Monster } from '../actors/Monster';
import { GameScene } from '../scenes/GameScene';
import { GlobalConfig } from '../Globals';
import { MonsterBuilder } from './MonsterBuilder';
import { Gun } from '../actors/wearables/Gun';
import { DumbShootLogic } from '../actors/ai/DumbShootLogic';
import { LookToPlayerLogic } from '../actors/ai/LookToPlayerLogic';

export class MonsterSpawner {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;

  builder = new MonsterBuilder(this);

  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      dragX: GlobalConfig.monsters.dragX,
      angularDrag: 200,
      mass: GlobalConfig.monsters.mass,
    });
  }

  // spawnMonster(x: number, y: number) {
  //   const monster = new Monster(this.scene, x, y, { key: 'monster.1' });

  //   // monster.body.sprite.setFriction(0.7, 0);
  //   this.group.add(monster);
  // }

  spawnMonster(monster: Monster) {
    this.group.add(monster);
  }

  spawnWeakMonster(x: number, y: number) {
    this.builder
      .reset()
      .texture({ key: 'monster.1' })
      .logic(new LookToPlayerLogic())
      .logic(new DumbShootLogic())
      .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(x, y);
  }
}
