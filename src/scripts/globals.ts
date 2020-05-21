export const Globals = {
  player: {
    speed: 400,
    jumpVelocity: 400,
  },
  weapons: {
    gunCooldown: 200,
  },
  bullets: {
    speed: 700,
  },
  monsters: {
    mass: 2,
    dragX: 200,
    speed: 200,
  },
};

export interface TextureKey {
  key: string;
  frame?: string;
}
