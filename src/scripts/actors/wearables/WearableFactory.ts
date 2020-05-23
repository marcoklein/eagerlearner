import { Gun } from './Gun';
import { Punch } from './Punch';
import { StraightGunShot } from './logics/StraightGunShot';
import { ShotgunFireLogic } from './logics/ShotgunFireLogic';

export abstract class WearableFactory {
  // TODO add generators for random gun :)
  // make gun shoot random stuff / different bullets

  static createEqualGun() {
    return new Gun({ key: 'weapon.equal' }, new StraightGunShot({ key: 'bullet.equal' }));
  }

  static createPlusGun() {
    return new Gun({ key: 'weapon.plus' }, new ShotgunFireLogic({ key: 'bullet.plus' }));
  }

  static createSigmaGun() {
    return new Gun({ key: 'weapon.sigma' }, new StraightGunShot({ key: 'bullet.sigma' }));
  }

  static createNamedStraightGun(name: string) {
    return new Gun({ key: `weapon.${name}` }, new StraightGunShot({ key: `bullet.${name}` }));
  }

  static createPunch() {
    return new Punch();
  }
}
