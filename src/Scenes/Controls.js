class Controls extends Phaser.Scene {
    constructor() {
        super("Controls");
        this.my = {sprite: {}};
    }

    preload() {
    }
    create() {
        this.add.text(500, 250, `Use A and D buttons to move 
your character left and right`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            align: 'center',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.add.text(500, 350, `use SPACE button to fire bullets,
be careful they are limited`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            align: 'center',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        const replayButton = this.add.text(500, 450, 'Return', { fontFamily: '"Press Start 2P"', fontSize: '32px', align: 'center', color: '#ffffff'})
            .setInteractive()
            .on('pointerdown', () => this.scene.start("Start"));
        replayButton.setOrigin(0.5, 0.5);
        
    }
}