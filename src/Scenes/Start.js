class Start extends Phaser.Scene {
    constructor() {
        super("Start");
        this.my = {sprite: {}};
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
        // const scoreText = this.add.text(500, 250, `YOUR SCORE: ${this.score}`, {
        //     fontFamily: 'Roboto',
        //     fontSize: '32px',
        //     align: 'center',
        //     color: '#ffffff'
        // });
        // scoreText.setOrigin(0.5, 0.5);
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                this.add.text(500, 250, `PRESS START TOO PLAY`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '32px',
                    align: 'center',
                    color: '#ffffff'
                }).setOrigin(0.5, 0.5);
                this.add.text(500, 350, `YOU GET ONE BULLET PER TARGET ON STAGE
GETTING HIT REMOVES ONE BULLET`, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '24px',
                    align: 'center',
                    color: '#ffffff'
                }).setOrigin(0.5, 0.5);
                const startButton = this.add.text(500, 450, 'START', { fontFamily: '"Press Start 2P"', fontSize: '32px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("Level1"));
                startButton.setOrigin(0.5, 0.5);

                const creditsButton = this.add.text(250, 650, 'CREDITS', { fontFamily: '"Press Start 2P"', fontSize: '24px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("Credits"));
                creditsButton.setOrigin(0.5, 0.5);
                
                const controlsButton = this.add.text(750, 650, 'CONTROLS', { fontFamily: '"Press Start 2P"', fontSize: '24px', align: 'center', color: '#ffffff'})
                    .setInteractive()
                    .on('pointerdown', () => this.scene.start("Controls"));
                controlsButton.setOrigin(0.5, 0.5);
            }
        });

        
    }
}