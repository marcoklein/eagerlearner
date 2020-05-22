import { LevelGenerator } from './LevelGenerator';
import { LevelController } from '../LevelController';
import { Gun } from '../../actors/wearables/Gun';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';
import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';

export class ActionLevelGenerator extends LevelGenerator {
  generate(level: LevelController): void {
    this.createTestLevel(level);
  }

  createTestLevel(level: LevelController) {
    // player start position
    level.hero.x = 0;
    level.hero.y = 0;
    level.hero.hands.equip(new Gun({ key: 'weapon.gun' }));
    // add platforms
    level.platforms.createPlatform(0, 100, 100);
    level.platforms.createPlatform(120, 140, 200);

    const weakMonster = new MonsterSpawner(level.spawner)
      .texture({ key: 'monster.1' })
      // .logic(new LookToPlayerLogic())
      // .logic(new DumbShootLogic())
      .logic(new PatrolLogic(350, 350 + 500))
      // .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1, 3);
    level.platforms.createPlatform(350, 180, 500);

    const standMonster = new MonsterSpawner(level.spawner)
      .texture({ key: 'monster.5' })
      .logic(new LookToPlayerLogic())
      .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1100, 100)
      .spawn(1150, 100);
    level.platforms.createPlatform(1000, 180, 500);

    level.addDoor(1200, 180);
  }
}
