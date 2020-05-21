import { Wearable } from "./Wearable";
import { HandComponent } from "./HandComponent";

export class Punch extends Wearable {

  onEquip(hands: HandComponent): void {

  }
  onUnequip(hands: HandComponent): void {
  }
  useAction(): void {
  }
  update(time: number, delta: number): void {
  }

  calculateHandPositions(hands: HandComponent, body: Phaser.Physics.Arcade.Sprite): HandPositions {
    return <any> {};
  }
  
}