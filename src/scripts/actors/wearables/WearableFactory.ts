import { Gun } from './Gun';
import { Punch } from './Punch';

export abstract class WearableFactory {
  // TODO add generators for random gun :)
  // make gun shoot random stuff / different bullets

  static createGun() {
    return new Gun({ key: 'weapon.gun' });
  }

  static createPunch() {
    return new Punch();
  }
}
