import { Projectile } from '../projectile/Projectile';
import { ProjectileType } from '../projectile/ProjectileType';

/**
 * Items contain things the Hero can pick up.
 * TODO clear this up - an item is not a projectile!
 */
export abstract class Item extends ProjectileType {}
