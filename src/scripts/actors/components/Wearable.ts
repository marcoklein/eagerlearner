import { HandComponent } from "./HandComponent";

export interface HandPositions {
  left: {x: number, y: number},
  right: {x: number, y: number},
}

export abstract class Wearable {
  hands: HandComponent | undefined;

  equip(hands: HandComponent) {
    this.hands = hands;
    this.onEquip(hands);
  };

  unequip(hands: HandComponent) {
    this.onUnequip(hands);
    this.hands = undefined;
  };

  abstract onEquip(hands: HandComponent): void;
  abstract onUnequip(hands: HandComponent): void;
  abstract useAction(): void;
  abstract update(time: number, delta: number): void;
  abstract calculateHandPositions(hands: HandComponent, body: Phaser.Physics.Arcade.Sprite): HandPositions;

}