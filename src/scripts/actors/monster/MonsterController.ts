import { DumbAttackLogic } from './ai/DumbShootLogic';
import { FollowPlayerLogic } from './ai/GoToPlayer';
import { LookToPlayerLogic } from './ai/LookToPlayerLogic';
import { Monster } from '../Monster';
import { Gun } from '../wearables/Gun';
import { GlobalConfig } from '../../Globals';
import { GameScene } from '../../scenes/GameScene';
import { MonsterSpawner } from './MonsterSpawner';
import { LevelController } from '../../level/LevelController';

export class MonsterController {
  readonly level: LevelController;
  readonly scene: GameScene;
  readonly group: Phaser.Physics.Arcade.Group;

  readonly builder = new MonsterSpawner(this);

  constructor(level: LevelController) {
    this.scene = level.scene;
    this.level = level;
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
    return (
      this.builder
        .reset()
        .texture({ key: 'monster.1' })
        .logic(new LookToPlayerLogic())
        // .logic(new DumbAttackLogic())
        .equip(new Gun({ key: 'weapon.gun' }))
        .spawn(x, y)
    );
  }

  spawnPunchingMonster(x: number, y: number) {
    return (
      this.builder
        .reset()
        .texture({ key: 'monster.5' })
        .logic(new LookToPlayerLogic())
        .logic(new FollowPlayerLogic())
        // .logic(new DumbShootLogic())
        // .equip(new Punch())
        .spawn(x, y)
    );
  }
}
