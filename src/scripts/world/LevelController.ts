import { GameScene } from '../scenes/GameScene';
import { Hero } from '../actors/Hero';
import { MonsterSpawner } from './MonsterSpawner';
import { PlatformController } from './PlatformController';
import { ProjectileController } from './ProjectileController';
import { CollisionController } from './CollisionController';
import { Gun } from '../actors/wearables/Gun';
import { LevelLogic } from './LevelLogic';

export class LevelController {
  scene: GameScene;

  hero: Hero;
  spawner: MonsterSpawner;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;

  logics: LevelLogic[] = [];

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  init() {
    this.hero = new Hero(this.scene, this.scene.cameras.main.width / 2, 0);
    this.platforms = new PlatformController(this.scene);
    this.spawner = new MonsterSpawner(this.scene);
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
    // add platforms
    this.platforms.createPlatform(0, 100, 100);
    this.platforms.createPlatform(120, 140);
  }
}
