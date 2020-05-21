import { Hero } from "../Hero";
import { Monster } from "../Monster";
import { Projectile } from "./Projectile";

export abstract class ProjectileEffect {
  
  /**
   * Apply effect to hero. Return true to destroy the projectile.
   * 
   * @param projectile 
   * @param hero 
   */
  abstract applyToHero(projectile: Projectile, hero: Hero): boolean;

  /**
   * Apply effect to a monster. Return true to destroy the projectile.
   * 
   * @param projectile 
   * @param hero 
   */
  abstract applyToMonster(projectile: Projectile, monster: Monster): boolean;

  applyToWall(projectile: Projectile, wall: Phaser.Physics.Arcade.StaticBody) {
    return true; // destroy per default
  }
}