import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';

/**
 * Params parts consider during generation of levels.
 */
export interface GenerationParams {
  platforms: {
    gap: {
      x: {
        min: number;
        max: number;
      };
      y: {
        min: number;
        max: number;
      };
    };
    size: {
      width: {
        min: number;
        max: number;
      };
    };
  };
  parts: {
    size: {
      width: {
        min: number;
        max: number;
      };
    };
  };
  monsters: MonsterSpawner[];
}

export type PartialGenerationParams = Partial<GenerationParams>;
