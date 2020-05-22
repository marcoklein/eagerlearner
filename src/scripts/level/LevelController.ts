import { GameScene } from '../scenes/GameScene';
import { Hero } from '../actors/Hero';
import { MonsterController } from '../actors/monster/MonsterController';
import { ProjectileController } from '../actors/projectile/ProjectileController';
import { CollisionController } from './CollisionController';
import { Gun } from '../actors/wearables/Gun';
import { LevelLogic } from './logic/LevelLogic';
import { LookToPlayerLogic } from '../actors/monster/ai/LookToPlayerLogic';
import { DumbShootLogic } from '../actors/monster/ai/DumbShootLogic';
import { PatrolLogic } from '../actors/monster/ai/PatrolLogic';
import { PlatformController } from './PlatformController';
import { MonsterSpawner } from '../actors/monster/MonsterSpawner';
import { DoorFinishLogic } from './logic/DoorFinishLogic';
import { LearningRoomGenerator } from './generator/LearningRoomGenerator';
import { ActionLevelGenerator } from './generator/ActionLevelGenerator';

export class LevelController {
  scene: GameScene;

  hero: Hero;
  spawner: MonsterController;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;

  logics: LevelLogic[] = [];

  initialized = false;

  learningRoomGenerator = new LearningRoomGenerator();
  actionLevelGenerator = new ActionLevelGenerator();

  gameIsActionLevel = false;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  init() {
    if (this.initialized) throw Error('Level already initialized.');
    this.initialized = true;
    this.hero = new Hero(this.scene, 0, 0);
    this.platforms = new PlatformController(this.scene);
    this.spawner = new MonsterController(this.scene);
    this.projectiles = new ProjectileController(this.scene);
    this.collisions = new CollisionController(this.scene);

    this.scene.cameras.main.startFollow(this.hero);

    this.createNextLevel();
  }

  /**
   * Resets everything except for the Hero.
   */
  newLevel() {
    if (!this.initialized) throw Error('Not initialized.');
    this.spawner.group.children.each((child) => child.destroy());
    this.projectiles.group.children.each((child) => child.destroy());
    this.clearLogics();
    setTimeout(() => {
      this.platforms.group.children.each((child) => child.destroy());
      this.createNextLevel();
    }, 3000);
  }

  private createNextLevel() {
    if (this.gameIsActionLevel) {
      this.gameIsActionLevel = false;
      this.learningRoomGenerator.generate(this);
    } else {
      this.gameIsActionLevel = true;
      this.actionLevelGenerator.generate(this);
    }
  }

  addLogic(logic: LevelLogic) {
    this.logics.push(logic);
    logic.onAttach(this);
  }

  clearLogics() {
    // detach logics
    this.logics.forEach((logic) => logic.onDetach(this));
    this.logics = [];
  }

  update(time: number, delta: number) {
    this.logics.forEach((logic) => logic.update(this, time, delta));
  }

  addDoor(x: number, y: number) {
    this.addLogic(new DoorFinishLogic(x, y));
  }

  /**
   * Called by the DoorChecker if the player walks through the door.
   * Finishes this level and advances to the "learning room".
   */
  finishLevel() {
    this.newLevel();
  }
}
