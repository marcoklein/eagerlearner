export abstract class Random {
  static between(min: number, max: number) {
    return Phaser.Math.Between(min, max);
  }
}
