/**
 * Something an actor can hold in his hands.
 * E.g. a gun.
 */
export class WearableComponent {
  actor: Phaser.Physics.Arcade.Sprite;

  constructor(actor: Phaser.Physics.Arcade.Sprite) {
    this.actor = actor;
  }

  use() {
    
  }


}