import { Projectile } from './Projectile';

export abstract class ProjectileType {
  abstract setupPhysicalAttributes(projectile: Projectile): void;
  abstract onDestroy(projectile: Projectile): void;
  abstract onUpdate(time: number, delta: number, projectile: Projectile): void;
}
