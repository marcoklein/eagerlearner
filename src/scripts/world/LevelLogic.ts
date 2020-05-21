import { LevelController } from './LevelController';

export abstract class LevelLogic {
  spawnedMonsters: number = 0;

  abstract onAttach(level: LevelController): void;

  update(level: LevelController, time: number, delta: number) {
    if (time > this.spawnedMonsters * 10000) {
      this.spawnedMonsters++;
      level.spawner.spawnWeakMonster(Phaser.Math.Between(300, 900), 0);
      level.spawner.spawnPunchingMonster(Phaser.Math.Between(300, 900), 0);
    }
  }
}
