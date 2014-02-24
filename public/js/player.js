define(
[
  'phaser'
]

,function(Phaser) {

  function Player(game) {
    Phaser.Sprite.call(this, game, 32, game.world.height - 150, 'dude');

    this.body.bounce.y = 0.05;
    this.body.gravity.y = 500;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0,1,2,3], 10, true);
    this.animations.add('right', [5,6,7,8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();

    game.add.existing(this);
  }

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -250;
      this.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
      this.body.velocity.x = 250;
      this.animations.play('right');
    }
    else {
      this.animations.stop();
      this.frame = 4;
    }

    // jump! (if they're already touching the ground)
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.body.velocity.y = -550;
    }
  };

  return Player;
}
);