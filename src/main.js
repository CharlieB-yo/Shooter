// debug with extreme prejudice
"use strict"

// game config
let config = {
    fps: { forceSetTimeOut: true, target: 30 },
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1000,
    height: 800,
    scene: [Start, Level1, Level2, Level3, End]
}

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
