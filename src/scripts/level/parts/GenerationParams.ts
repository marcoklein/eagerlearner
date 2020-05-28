import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';

export interface SectionGenerationParams {
  sections: PartGenerationParams[];
}

/**
 * Params parts consider during generation of levels.
 */
export interface PartGenerationParams {
  sectionLength: number,
  platformGapXMin: number,
  platformGapXMax: number,
  platformGapYMin: number,
  platformGapYMax: number,
  platformWidthMin: number,
  platformWidthMax: number,
  monsters: MonsterSpawner[],
}

export type PartialGenerationParams = Partial<PartGenerationParams>;


export function combinePartParams(base: PartGenerationParams, custom: Partial<PartGenerationParams>) {
  custom.monsters = custom.monsters || [];
  return Object.assign(Object.assign({}, base), custom) as PartGenerationParams;
}
