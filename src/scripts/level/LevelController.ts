import { GameScene } from '../scenes/GameScene';
import { Hero } from '../actors/Hero';
import { MonsterController } from '../actors/monster/MonsterController';
import { ProjectileController } from '../actors/projectile/ProjectileController';
import { CollisionController } from './CollisionController';
import { Gun } from '../actors/wearables/Gun';
import { LevelLogic } from './LevelLogic';
import { LookToPlayerLogic } from '../actors/monster/ai/LookToPlayerLogic';
import { DumbShootLogic } from '../actors/monster/ai/DumbShootLogic';
import { PatrolLogic } from '../actors/monster/ai/PatrolLogic';
import { PlatformController } from './PlatformController';
import { MonsterSpawner } from '../actors/monster/MonsterSpawner';
import { DoorChecker } from './DoorChecker';

export class LevelController {
  scene: GameScene;

  hero: Hero;
  spawner: MonsterController;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;

  /**
   * Exit door of level.
   */
  door: Phaser.GameObjects.Image;

  logics: LevelLogic[] = [];

  initialized = false;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  private init() {
    if (this.initialized) throw Error('Level already initialized.');
    this.initialized = true;
    this.hero = new Hero(this.scene, 0, 0);
    this.platforms = new PlatformController(this.scene);
    this.spawner = new MonsterController(this.scene);
    this.projectiles = new ProjectileController(this.scene);
    this.collisions = new CollisionController(this.scene);

    this.scene.cameras.main.startFollow(this.hero);
  }

  addLogic(logic: LevelLogic) {
    this.logics.push(logic);
    logic.onAttach(this);
  }

  update(time: number, delta: number) {
    this.logics.forEach((logic) => logic.update(this, time, delta));
  }

  createLevel1() {
    this.init();
    // player start position
    this.hero.x = 0;
    this.hero.y = 0;
    this.hero.hands.equip(new Gun({ key: 'weapon.gun' }));
    // add platforms
    this.platforms.createPlatform(0, 100, 100);
    this.platforms.createPlatform(120, 140, 200);

    const weakMonster = new MonsterSpawner(this.spawner)
      .texture({ key: 'monster.1' })
      // .logic(new LookToPlayerLogic())
      // .logic(new DumbShootLogic())
      .logic(new PatrolLogic(350, 350 + 500))
      // .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1, 3);
    this.platforms.createPlatform(350, 180, 500);

    const standMonster = new MonsterSpawner(this.spawner)
      .texture({ key: 'monster.5' })
      .logic(new LookToPlayerLogic())
      .equip(new Gun({ key: 'weapon.gun' }))
      .spawn(1100, 100)
      .spawn(1150, 100);
    this.platforms.createPlatform(1000, 180, 500);

    this.addDoor(1200, 180);
  }

  addDoor(x: number, y: number) {
    if (this.door) throw new Error('door already created.');
    this.door = this.scene.add.image(x, y, 'world.door');
    this.door.setOrigin(0.5, 1);
    this.door.setDepth(-100); // always in background
    this.addLogic(new DoorChecker());
  }

  /**
   * Called by the DoorChecker if the player walks through the door.
   * Finishes this level and advances to the "learning room".
   */
  finishLevel() {}
}
