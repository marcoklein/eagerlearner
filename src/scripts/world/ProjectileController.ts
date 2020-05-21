import { GameScene } from "../scenes/GameScene";import { Globals, TextureKey } from "../Globals";
import { Projectile } from "../actors/projectile/Projectile";
import { Bullet } from "../actors/projectile/Bullet";
import { Hero } from "../actors/Hero";
import { ProjectileBuilder } from "../actors/projectile/ProjectileBuilder";

/**
 * Manages everything that generally flys around in the world and has some effect on actors.
 */
export class ProjectileController {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;
  builder = new ProjectileBuilder(this);
  
  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      dragX: Globals.monsters.dragX,
      angularDrag: 200,
      allowGravity: false,
    });
  }

  addProjectile(projectile: Projectile) {
    this.group.add(projectile);
    projectile.setupPhysicalAttributes();
  }

  fireBullet(x: number, y: number, velocity: Phaser.Math.Vector2, texture: TextureKey) {
    this.builder
      .reset()
      .texture(texture)
      .type(new Bullet(velocity))
      .spawn(x, y);
  }
  
}