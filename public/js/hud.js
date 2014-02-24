define(
[
  'phaser'
]

,function(Phaser) {

  function Hud(game) {
    Phaser.Text.call(this, game, 16, 16, 'Score: 0', {font: '32px arial', fill: '#000'});

    this.score = 0;

    game.add.existing(this);
  }

  Hud.prototype = Object.create(Phaser.Text.prototype);
  Hud.prototype.constructor = Hud;

  Hud.prototype.incrementScore = function() {
    this.score += 10;
    this.content = 'Score: ' + this.score;
  };

  return Hud;
})