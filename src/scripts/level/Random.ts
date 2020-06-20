export abstract class Random {
  static between(min: number, max: number) {
    return Phaser.Math.Between(min, max);
  }

  /**
   * Get random array element.
   *
   * @param array
   */
  static element<T>(array: T[]) {
    return array[Phaser.Math.Between(0, array.length - 1)];
  }

  static boolean() {
    return Phaser.Math.Between(0, 1) === 0;
  }

  static rndSquared(min: number, max: number) {
    const input = Phaser.Math.Between(min, max);
    const inputMinusMax = input - max;
    const inputSquared = inputMinusMax * inputMinusMax;
    const a = -1 / max;
    return Math.round(a * inputSquared + max);
  }
}
