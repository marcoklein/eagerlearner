import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';

export interface SectionGenerationParams {
  sections: {
    sectionLength: number,
    part: PartGenerationParams,
  }[];
}

/**
 * Params parts consider during generation of levels.
 */
export interface PartGenerationParams {
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
  monsters: MonsterSpawner[];
}

export type PartialGenerationParams = Partial<PartGenerationParams>;
