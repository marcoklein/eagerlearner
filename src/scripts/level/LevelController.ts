import { Hero } from '../actors/Hero';
import { MonsterController } from '../actors/monster/MonsterController';
import { ProjectileController } from '../actors/projectile/ProjectileController';
import { GlobalConfig } from '../Globals';
import { GameScene } from '../scenes/GameScene';
import { CollisionController } from './CollisionController';
import { ActionLevelGenerator } from './generator/ActionLevelGenerator';
import { IntroRoomGenerator } from './generator/IntroRoomGenerator';
import { LearningRoomGenerator } from './generator/LearningRoomGenerator';
import { DoorFinishLogic } from './logic/DoorFinishLogic';
import { LevelLogic } from './logic/LevelLogic';
import { PlayerDeadLogic } from './logic/PlayerDeadLogic';
import { PlatformController } from './platforms/PlatformController';
import { ParticleController } from './ParticleController';

export enum LevelState {
  HOME,
  PLAYING,
  DEAD,
}

export class LevelController {
  scene: GameScene;
  initialized = false;

  private _hero: Hero;
  heroGroup: Phaser.Physics.Arcade.Group;

  // controllers
  spawner: MonsterController;
  platforms: PlatformController;
  projectiles: ProjectileController;
  collisions: CollisionController;
  particles: ParticleController;

  logics: LevelLogic[] = [];

  learningRoomGenerator = new LearningRoomGenerator();
  actionLevelGenerator = new ActionLevelGenerator();
  introRoomGenerator = new IntroRoomGenerator();

  private _state = LevelState.HOME;

  highscore: number = 0;

  /**
   * 0 means that we are "home".
   * 1 is the first level
   * 2 is the learning room
   * 3 is the next level
   * ... and so on
   */
  get levelNumber() {
    return this.actionLevel + this.learningLevel;
  }

  actionLevel = 0;
  learningLevel = 0;

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
    this.spawner = new MonsterController(this);
    this.projectiles = new ProjectileController(this.scene);
    this.collisions = new CollisionController(this);
    this.particles = new ParticleController(this);

    this.loadHighscores();

    this.restartGame();
  }

  /**
   * Kills and restarts complete game.
   */
  restartGame() {
    console.log('restarting game');
    this.saveHighscore();
    // reset level and hero
    this.resetLevel();

    this.changeState(LevelState.HOME);

    this.createHero();
    this.setCameraOffset(0, this.hero.height / 2);

    this.actionLevel = 0;
    this.learningLevel = 0;
    this.createNextLevel(true);
  }

  private createHero() {
    this.heroGroup.children.each((child) => child.destroy());
    this._hero = new Hero(this, 0, 0);
    this.heroGroup.add(this.hero);
    console.log('created and added hero', this.heroGroup.children.size);
  }

  /**
   * Resets everything except for the Hero.
   */
  private newLevel() {
    if (!this.initialized) throw Error('Not initialized.');
    console.log('new level!!! with number', this.levelNumber);
    // edit .. clearLogics() is only necessary when we have a delay between rooms
    this.clearLogics(); // CLEAR logics! => otherwise the door logic will continously call finish level
    this.resetLevel();
    this.createNextLevel();
  }

  private resetLevel() {
    this.clearLogics();
    this.spawner.group.children.each((child) => child.destroy());
    this.projectiles.group.children.each((child) => child.destroy());
    this.platforms.group.children.each((child) => child.destroy());
    this.particles.destroyParticles();
  }

  private createNextLevel(introRoom: boolean = false) {
    // general logic components
    this.addLogic(new PlayerDeadLogic());
    if (GlobalConfig.debug.learningLevelOnly) {
      console.log('starting new learning level!!');
      this.learningLevel++;
      this.learningRoomGenerator.generate(this);
    } else if (GlobalConfig.debug.actionLevelOnly) {
      console.log('starting new Action level!!');
      this.actionLevel++;
      this.actionLevelGenerator.generate(this);
    } else if (introRoom) {
      this.introRoomGenerator.generate(this);
    } else if (this.actionLevel <= this.learningLevel) {
      // start with action level
      console.log('starting new Action level!!');
      this.actionLevel++;
      this.actionLevelGenerator.generate(this);
    } else {
      console.log('starting new learning level!!');
      this.learningLevel++;
      this.learningRoomGenerator.generate(this);
    }
    this.hero.body.velocity.set(0, 0);
    this.hero.body.acceleration.set(0, 0);
    this.hero.body.y -= 10;
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
    this.scene.cameras.main.centerOn(x, y); // move immediately to avoid initial "lag" when switching levels
    this.scene.cameras.main.startFollow(this.hero, true, 0.5, 0.5, x, y);
  }

  saveHighscore() {
    if (this.actionLevel > this.highscore) {
      this.highscore = this.actionLevel;
      localStorage.setItem('highscore', '' + this.highscore);
    }
  }

  loadHighscores() {
    const highscore = localStorage.getItem('highscore');
    if (highscore) {
      this.highscore = parseInt(highscore);
    }
  }

  get state() {
    return this._state;
  }

  get hero() {
    return this._hero;
  }
}
