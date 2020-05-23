export const GlobalConfig = {
  physics: {
    gravity: 2000,
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
    lifetime: 800,
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
