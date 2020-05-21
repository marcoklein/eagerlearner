export const globals = {
  player: {
    speed: 400,
    jumpVelocity: 400,
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
