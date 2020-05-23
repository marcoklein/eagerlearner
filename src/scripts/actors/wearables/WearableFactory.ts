import { Gun } from './Gun';

export abstract class WearableFactory {
  static createGun() {
    return new Gun({ key: 'weapon.gun' });
  }
}
