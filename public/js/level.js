define(
[
  'phaser'
  ,'player'
  , 'hud'
]

,function(Phaser, Player, Hud) {

  function Level(game) {
    Phaser.Group.call(this, game);

    this.player = new Player(game);

    this.hud = new Hud(game);

    this.buildLevel();

    game.add.existing(this);
  }

  Level.prototype = Object.create(Phaser.Group.prototype);
  Level.prototype.constructor = Level;

  Level.prototype.buildLevel = function() {
    this.game.add.sprite(0, 0, 'sky');

    this.platforms = this.game.add.group();
    this.stars = this.game.add.group();

    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

    ground.scale.setTo(2, 2);

    ground.body.immovable = true;

    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    for (var i = 0; i < 12; i++) {
      var star = this.stars.create(i * 70, 0, 'star');

      star.body.gravity.y = 10;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
  };

  Level.prototype.update = function() {
    this.game.physics.collide(this.player, this.platforms);
    this.game.physics.collide(this.stars, this.platforms);
    this.game.physics.overlap(this.player, this.stars, this.collectStars, null, this);

    this.player.update();
  };

  Level.prototype.collectStars = function(player, star) {
    star.kill();

    this.hud.incrementScore();
  };

  return Level;

});