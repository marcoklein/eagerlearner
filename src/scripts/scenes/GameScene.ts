import { Hero } from '../actors/Hero';
import FpsText from '../objects/fpsText';
import { MonsterSpawner } from '../world/MonsterSpawner';
import { PlatformController } from '../world/PlatformController';
import { Gun } from '../actors/wearables/Gun';
import { ProjectileController } from '../world/ProjectileController';
import { CollisionController } from '../world/CollisionController';

export class GameScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  hero: Hero;
  spawner: MonsterSpawner;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;

  spawnedMonsters: number = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);

    this.hero = new Hero(this, this.cameras.main.width / 2, 0);
    this.hero.hands.equip(new Gun({ key: 'weapon.gun' }));

    this.platforms = new PlatformController(this);
    this.platforms.createPlatform(this.cameras.main.width / 2, 500);

    const monsterSpawner = new MonsterSpawner(this);
    monsterSpawner.spawnWeakMonster(500, 0);
    this.spawner = monsterSpawner;

    this.projectiles = new ProjectileController(this);

    this.collisions = new CollisionController(this);
  }

  update(time: number, delta: number) {
    this.fpsText.update(time, delta);
    if (time > this.spawnedMonsters * 10000) {
      this.spawnedMonsters++;
      this.spawner.spawnWeakMonster(Phaser.Math.Between(300, 900), 0);
    }
  }
}
