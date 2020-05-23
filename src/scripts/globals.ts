export const GlobalConfig = {
  world: {
    gravity: 2000,
    falldownY: 600,
  },
  player: {
    speed: 400,
    jumpVelocity: 800,
    mass: 10,
    dragX: 1000,
  },
  weapons: {
    gunCooldown: 200,
  },
  bullets: {
    speed: 700,
    /**
     * Lifetime of a bullet.
     * Should be a value that the Hero can see the enemy (to count it).
     */
    lifetime: 750,
  },
  monsters: {
    mass: 10,
    dragX: 1000,
    speed: 200,
  },
};

export interface TextureKey {
  key: string;
  frame?: string;
}
