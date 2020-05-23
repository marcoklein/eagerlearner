import { Projectile } from '../projectile/Projectile';
import { ProjectileType } from '../projectile/ProjectileType';

/**
 * I know its a little bit strange.. But a Projectile is actually anything that flys or sits around in the world and can interact with monsters/walls/ or the hero.
 * "Consumable" or EffectEntity would be a better name.n */
export abstract class Item extends ProjectileType {}
