import { LookToPlayerLogic } from '../../actors/monster/ai/LookToPlayerLogic';
import { MonsterSpawner } from '../../actors/monster/MonsterSpawner';
import { Punch } from '../../actors/wearables/Punch';
import { LevelController } from '../LevelController';
import { LevelLogic } from '../logic/LevelLogic';
import { Platform } from '../platforms/Platform';
import { PartGenerationParams, SectionGenerationParams, combinePartParams } from './GenerationParams';
import { IntroPart } from './IntroPart';
import { LevelPart } from './LevelPart';
import { SinglePlatformPart } from './SinglePlatformPart';
import { AttackOnPlayerSight } from '../../actors/monster/ai/AttackOnPlayerSight';
import { WearableFactory } from '../../actors/wearables/WearableFactory';
import { PatrolLogic } from '../../actors/monster/ai/PatrolLogic';
import { JumpLogic } from '../../actors/monster/ai/JumpLogic';
import { Random } from '../generator/Random';
import { LootPart } from './LootPart';

export const BASE_PART_PARAMS: PartGenerationParams = {
  sectionLength: 2000,
  platformGapXMin: 0,
  platformGapXMax: 250,
  platformGapYMin: -100,
  platformGapYMax: 100,
  platformWidthMin: 100,
  platformWidthMax: 1500,
  monsters: [],
};

export const BASE_SECTION_PARAMS: SectionGenerationParams = {
  sections: [
    combinePartParams(BASE_PART_PARAMS, {}), // long platforms
    combinePartParams(BASE_PART_PARAMS, { platformWidthMax: 250 }), // short platforms
    combinePartParams(BASE_PART_PARAMS, { platformWidthMax: 500, platformGapYMax: 300 }), // goes downards
    combinePartParams(BASE_PART_PARAMS, {}),
    combinePartParams(BASE_PART_PARAMS, {}),
  ],
};

export class LevelGenerator extends LevelLogic {
  level: LevelController;
  sectionParams = BASE_SECTION_PARAMS;
  prevParts: Array<{ platform: Platform; part: LevelPart }> = [];
  /**
   * A level is separated into individual sections.
   */
  sectionNumber = -1;

  /**
   * X-position of next ending section.
   */
  nextSectionEndX = 0;

  gameStarted = false;

  constructor() {
    super();
  }

  onAttach(level: LevelController): void {
    this.level = level;
    this.sectionNumber = -1;
    this.sectionParams = BASE_SECTION_PARAMS;
    this.gameStarted = false;

    // new level

    /** INTRO */
    const introPart = IntroPart.create();

    /** MONSTER GENERATION */
    const monsterTextures = [
      'monster.1',
      'monster.2',
      'monster.3',
      'monster.4',
      'monster.5',
      'monster.6',
      'monster.7',
      'monster.8',
      'monster.9',
      'monster.0',
    ];
    const wearables = [
      WearableFactory.createPunch(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createPunch(),
      WearableFactory.createEqualGun(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createPlusGun(),
      WearableFactory.createGoodOldBlaster(),
    ];

    // generate monsters
    const monsters = [
      // lvl 1
      MonsterSpawner.create(level.spawner)
        .texture({ key: monsterTextures[0] })
        .equip(WearableFactory.createPunch())
        .logic(new LookToPlayerLogic())
        // .logic(new PatrolLogic())
        .logic(new JumpLogic(200, 2000))
        .logic(new AttackOnPlayerSight(200, 2000)),
      // lvl 2
      MonsterSpawner.create(level.spawner)
        .texture({ key: monsterTextures[1] })
        .equip(WearableFactory.createSigmaGun())
        .logic(new LookToPlayerLogic())
        .logic(new PatrolLogic())
        .logic(new AttackOnPlayerSight(1500, 3000)),
      // lvl 3
      MonsterSpawner.create(level.spawner)
        .texture({ key: monsterTextures[2] })
        .equip(WearableFactory.createEqualGun())
        .logic(new LookToPlayerLogic())
        .logic(new PatrolLogic())
        .logic(new AttackOnPlayerSight(1500, 3000)),
      // lvl 4
      MonsterSpawner.create(level.spawner)
        .texture({ key: monsterTextures[3] })
        .equip(WearableFactory.createPlusGun())
        .logic(new LookToPlayerLogic())
        .logic(new PatrolLogic())
        .logic(new AttackOnPlayerSight(2000, 4000)),
    ];

    // add monsters to sections
    this.sectionParams.sections.forEach((section, index) => {
      console.log('adding monsters to section', index);
      for (let i = 0; i < monsters.length && i <= index; i++) {
        console.log('adding monster at ', i, 'to section', index);
        section.monsters.push(monsters[i]);
      }
    });
    console.log('sections after monster attachements: ', this.sectionParams);

    this.continueToNextSection();
    this.appendPart(introPart);
  }

  onDetach(level: LevelController): void {}

  update(level: LevelController, time: number, delta: number): void {
    // generate
    // smooth scroll of camera
    this.adjustCamScroll(level);
    if (level.hero.x > this.nextSectionEndX) {
      // spawn loot room and continue to next section
      console.log('adding loot part');
      this.appendPart(LootPart.create());

      this.continueToNextSection(this.getPrevPart().platform.x);
    } else if (level.hero.x > this.getPrevPart().platform.getLeftCenter().x - this.level.scene.cameras.main.width / 2) {
      this.appendPart(SinglePlatformPart.create());
    }
    if (!this.gameStarted && level.hero.x > 0) {
      this.gameStarted = true;
      this.startActionGame();
    }

    this.clearOutofSightStuff();
  }

  private clearOutofSightStuff() {
    while (this.prevParts.length > 1) {
      // never delete all parts
      const part = this.prevParts[0];
      if (part.platform.getRightCenter().x < this.level.hero.x - this.level.scene.cameras.main.width / 2) {
        // not visible -> destroy
        this.prevParts.shift();
        part.part.destroy(this.level);
      } else {
        break;
      }
    }
  }

  /**
   * Cam is initially a little bit over the player and moves into center
   * of player when leaving the intro platform.
   * @param level
   */
  private adjustCamScroll(level: LevelController) {
    const camDownScrollX = 400;
    const camIntroY = 100;
    const camXTarget = 800;
    const camYTarget = level.hero.displayHeight / 2;
    let camY = camYTarget;
    if (level.hero.x < camDownScrollX) {
      camY = camIntroY;
    } else if (level.hero.x < camXTarget) {
      const m = (camYTarget - camIntroY) / (camXTarget - camDownScrollX);
      camY = m * (level.hero.x - camDownScrollX) + camIntroY;
    }
    level.setCameraOffset(0, camY);
  }

  appendPart(part: LevelPart) {
    let x, y: number;
    if (!this.getPrevPart()) {
      x = 0;
      y = 0;
    } else {
      const topRight = this.getPrevPart().platform.getTopRight();
      x = topRight.x;
      y = topRight.y;
    }
    console.log('appending part with section params', this.getCurrentSectionParams());
    this.pushPrevPart(part, part.append(this.level, this.getCurrentSectionParams(), x, y));
  }

  private getCurrentSectionParams() {
    console.log(this.sectionNumber, this.sectionParams.sections.length);
    if (this.sectionNumber >= this.sectionParams.sections.length) return Random.element(this.sectionParams.sections);
    return this.sectionParams.sections[this.sectionNumber];
  }

  private continueToNextSection(prevPlatformX: number = 0) {
    this.sectionNumber++;
    this.nextSectionEndX =
      this.getCurrentSectionParams().sectionLength +
      prevPlatformX +
      (this.getPrevPart() ? this.getPrevPart().platform.displayWidth : 0);

    console.log('to next section:', this.nextSectionEndX);
  }

  private startActionGame() {
    // TODO change background and stuff
    this.level.music.playInGameMusic();
  }

  private pushPrevPart(part: LevelPart, platform: Platform) {
    return this.prevParts.push({
      part,
      platform,
    });
  }

  private getPrevPart() {
    // if (!this.prevParts.length) return undefined;
    return this.prevParts[this.prevParts.length - 1];
  }
}
