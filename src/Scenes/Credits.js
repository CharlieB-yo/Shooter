class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
        this.my = {sprite: {}};
    }

    preload() {
    }
    create() {
        this.add.text(500, 250, `Made By Charlie Bliss`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            align: 'center',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);
        this.add.text(500, 350, `Graphics And Audio By Kenney.nl`, {
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