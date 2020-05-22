import { LevelLogic } from './LevelLogic';
import { LevelController } from './LevelController';

export class SimpleSpawner extends LevelLogic {
  spawnedMonsters: number = 0;

  onAttach(level: LevelController) {
    this.spawnedMonsters = 0;
  }

  update(level: LevelController, time: number, delta: number) {
    if (time > this.spawnedMonsters * 10000) {
      this.spawnedMonsters++;
      level.spawner.spawnWeakMonster(Phaser.Math.Between(300, 900), 0);
      level.spawner.spawnPunchingMonster(Phaser.Math.Between(300, 900), 0);
    }
  }
}
