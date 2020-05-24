import { Gun } from './Gun';
import { Punch } from './Punch';
import { StraightGunShot } from './logics/StraightGunShot';
import { ShotgunFireLogic } from './logics/ShotgunFireLogic';
import { GrenadeFireLogic } from './logics/GrenadeFireLogic';
import { Random } from '../../level/generator/Random';

export abstract class WearableFactory {
  // TODO add generators for random gun :)
  // make gun shoot random stuff / different bullets

  static createEqualGun() {
    return new Gun({ key: 'weapon.equal' }, new StraightGunShot({ key: 'bullet.equal' }));
  }

  static createPlusGun() {
    return new Gun({ key: 'weapon.plus' }, new GrenadeFireLogic({ key: 'bullet.plus' }));
  }

  static createSigmaGun() {
    return new Gun({ key: 'weapon.sigma' }, new ShotgunFireLogic({ key: 'bullet.sigma' }));
  }

  static createGoodOldBlaster() {
    return new Gun({ key: 'weapon.gun' }, new StraightGunShot({ key: 'weapon.bullet' }));
  }

  static createNamedStraightGun(name: string) {
    return new Gun({ key: `weapon.${name}` }, new StraightGunShot({ key: `bullet.${name}` }));
  }

  static createRandomGun() {
    return Random.element([
      WearableFactory.createEqualGun(),
      WearableFactory.createPlusGun(),
      WearableFactory.createSigmaGun(),
      WearableFactory.createGoodOldBlaster(),
    ]);
  }

  static createPunch() {
    return new Punch();
  }
}
