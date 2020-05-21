import { Hero } from "../actors/Hero";
import { Monster } from "../actors/Monster";
import { Projectile } from "../actors/projectile/Projectile";
import { GameScene } from "../scenes/GameScene";

export class CollisionController {
  scene: GameScene;
  
  constructor(scene: GameScene) {
    this.scene = scene;
    this.init();
  }

  private init() {
    const scene = this.scene;
    scene.physics.add.collider(scene.hero, scene.platforms.group);
    scene.physics.add.collider(scene.spawner.group, scene.platforms.group);
    scene.physics.add.collider(scene.spawner.group, scene.hero);
      
    scene.physics.add.overlap(this.scene.projectiles.group, scene.platforms.group, (a, b) => {
      // collided with wall
      if (a instanceof Phaser.Physics.Arcade.StaticBody && b instanceof Projectile) {
        b.onWallCollision(a);
      } else if (b instanceof Phaser.Physics.Arcade.StaticBody && a instanceof Projectile) {
        a.onWallCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });
    
    scene.physics.add.overlap(scene.projectiles.group, scene.spawner.group, (a, b) => {
      // collided with monster
      if (a instanceof Monster && b instanceof Projectile) {
        b.onMonsterCollision(a);
      } else if (b instanceof Monster && a instanceof Projectile) {
        a.onMonsterCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });
    
    scene.physics.add.overlap(this.scene.projectiles.group, scene.hero, (a, b) => {
      // collided with hero
      if (a instanceof Hero && b instanceof Projectile) {
        b.onHeroCollision(a);
      } else if (b instanceof Hero && a instanceof Projectile) {
        a.onHeroCollision(b);
      } else {
        throw new Error('Wrong type during collision');
      }
    });
  }
  
}