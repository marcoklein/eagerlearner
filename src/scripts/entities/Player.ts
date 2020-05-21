import BodyComponent from "./BodyComponent";
import HandComponent from "./HandComponent";
import PlayerControlComponent from "./PlayerControlComponent";

export default class Player {
  scene: Phaser.Scene;
  body: BodyComponent;
  hands: HandComponent;
  control: PlayerControlComponent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.body = new BodyComponent(this.scene, x, y);
    this.hands = new HandComponent(this.scene, this.body);
    this.control = new PlayerControlComponent(this.scene, this);
  }

  update(time: number, delta: number) {
    this.body.update(time, delta);
    this.hands.update(time, delta);
    this.control.update(time, delta);
  }

}
