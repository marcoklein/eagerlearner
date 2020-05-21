import { GameScene } from "../../scenes/GameScene";
import { TextureKey } from "../../Globals";
import { Monster } from "../Monster";

/**
 * Something that flys and has an effect on collision.
 */
export class Bullet extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: GameScene, x: number, y: number, velocity: Phaser.Math.Vector2, texture: TextureKey) {
    super(scene, x, y, texture.key, texture.frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setVelocity(velocity.x, velocity.y);
    this.setGravityY(-scene.physics.world.gravity.y); // shoot straight

    this.flipX = velocity.x < 0;
    this.depth = -1;

    scene.physics.add.overlap(this, scene.platforms.group, () => {
      // collided with wall

    });
    scene.physics.add.overlap(this, scene.spawner.group, (bullet, other) => {
      // collided with monster
      const physicsBody = other.body as Phaser.Physics.Arcade.Body;
      physicsBody.velocity.y += -600;
    });

  }

}