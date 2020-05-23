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
import { PlayerDeadLogic } from './logic/PlayerDeadLogic';
import { GlobalConfig } from '../Globals';

export enum LevelState {
  HOME,
  PLAYING,
  DEAD,
}

export class LevelController {
  scene: GameScene;

  private _hero: Hero;
  heroGroup: Phaser.Physics.Arcade.Group;
  spawner: MonsterController;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;

  logics: LevelLogic[] = [];

  initialized = false;

  learningRoomGenerator = new LearningRoomGenerator();
  actionLevelGenerator = new ActionLevelGenerator();

  gameIsActionLevel = true;

  private _state = LevelState.HOME;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  init() {
    if (this.initialized) throw Error('Level already initialized.');
    this.initialized = true;
    this.heroGroup = this.scene.physics.add.group({
      dragX: GlobalConfig.player.dragX,
      mass: GlobalConfig.player.mass,
    });
    this.platforms = new PlatformController(this.scene);
    this.spawner = new MonsterController(this.scene);
    this.projectiles = new ProjectileController(this.scene);
    this.collisions = new CollisionController(this);

    this.restartGame();
  }

  /**
   * Kills and restarts complete game.
   */
  restartGame() {
    console.log('restarting game');
    // reset level and hero
    this.resetLevel();

    this.changeState(LevelState.HOME);

    this.createHero();
    this.setCameraOffset(0, this.hero.height / 2);

    this.gameIsActionLevel = true;
    this.createNextLevel();
  }

  private createHero() {
    this.heroGroup.children.each((child) => child.destroy());
    this._hero = new Hero(this.scene, 0, 0);
    this.heroGroup.add(this.hero);
    console.log('created and added hero', this.heroGroup.children.size);
  }

  /**
   * Resets everything except for the Hero.
   */
  private newLevel() {
    if (!this.initialized) throw Error('Not initialized.');
    console.log('new level!!!');
    this.spawner.group.active = false;
    this.projectiles.group.active = false;
    this.clearLogics(); // CLEAR logics! => otherwise the door logic will continously call finish level
    setTimeout(() => {
      this.spawner.group.active = true;
      this.projectiles.group.active = true;
      this.resetLevel();
      this.createNextLevel();
    }, 100);
  }

  private resetLevel() {
    this.clearLogics();
    this.spawner.group.children.each((child) => child.destroy());
    this.projectiles.group.children.each((child) => child.destroy());
    this.platforms.group.children.each((child) => child.destroy());
  }

  private createNextLevel() {
    // general logic components
    this.addLogic(new PlayerDeadLogic());

    if (this.gameIsActionLevel) {
      this.gameIsActionLevel = false;
      this.learningRoomGenerator.generate(this);
    } else {
      this.gameIsActionLevel = true;
      this.actionLevelGenerator.generate(this);
    }
  }

  addLogic(logic: LevelLogic) {
    console.log('adding logic');
    this.logics.push(logic);
    logic.onAttach(this);
  }

  private clearLogics() {
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

  changeState(newState: LevelState) {
    this._state = newState;
  }

  setCameraOffset(x: number, y: number) {
    this.scene.cameras.main.startFollow(this.hero, false, 1, 1, x, y);
  }

  get state() {
    return this._state;
  }

  get hero() {
    return this._hero;
  }
}
