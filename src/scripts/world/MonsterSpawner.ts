import { Monster } from "../actors/Monster";
import { GameScene } from "../scenes/GameScene";

export class MonsterSpawner {
  scene: GameScene;
  group: Phaser.Physics.Arcade.Group;

  

  constructor(scene: GameScene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      dragX: 200,
      collideWorldBounds: true,
    });
  }

  spawnMonster(x: number, y: number) {
    const monster = new Monster(this.scene, x, y, {key: 'monster.1'});
    
    // monster.body.sprite.setFriction(0.7, 0);
    this.group.add(monster);
  }

}
