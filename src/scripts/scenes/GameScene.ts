import { Hero } from '../actors/Hero';
import FpsText from '../objects/fpsText';
import { MonsterSpawner } from '../world/MonsterSpawner';
import { PlatformController } from '../world/PlatformController';

export class GameScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  player: Hero;


  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.fpsText = new FpsText(this);

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24,
      })
      .setOrigin(1, 0);
    
    this.player = new Hero(this, this.cameras.main.width / 2, 0);
    const platforms = new PlatformController(this);
    platforms.createPlatform(this.cameras.main.width / 2, 500);
    
    const monsterSpawner = new MonsterSpawner(this);
    monsterSpawner.spawnMonster(500, 0);

    this.physics.add.collider(this.player, platforms.group);
    this.physics.add.collider(monsterSpawner.group, platforms.group);
    this.physics.add.collider(monsterSpawner.group, this.player);
    console.log('created');
  }

  update(time: number, delta: number) {
    // this.fpsText.update(time, delta);
    // this.player.update(time, delta);

  }
}
