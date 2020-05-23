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
}
