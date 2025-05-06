class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
        this.my = {sprite: {}};
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "rifle.png");
        this.load.image("bullet", "icon_bullet_silver_short.png");
        this.load.image("target", "target_red1.png");
        this.load.audio("shoot", "impactGeneric_light_004.OGG");
        this.load.audio("hit", "impactGeneric_light_002.OGG");
    }

    create() {
        this.score = 0;
        let my = this.my;   // create an alias to this.my for readability
        this.dKey = this.input.keyboard.addKey(68);
        this.aKey = this.input.keyboard.addKey(65);
        this.Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bullets = new Array(10);

        this.targets = new Array(5);
        for(let i = 1; i<7; i++){
            this.targets[i-1] = this.add.sprite((1000/7) * i, 75, "target");
        }

        this.count = 0;
        this.bulletCount = 6;

        my.sprite.player = this.add.sprite(500, 850, "player");
        console.log(typeof(my.sprite.player));
        //my.sprite.bullet = this.add.sprite(500, 650, "bullet");
    }

    update() {
        this.count += 1;
        let my = this.my;    // create an alias to this.my for readability
        if (this.count >= 10 && this.Space.isDown && this.bulletCount > 0){
            let i = 0;
            while(i<10 && typeof(this.bullets[i]) == "object"){
                i += 1;
            }
            if(i < 10){
                this.bullets[i] = this.add.sprite(my.sprite.player.x-60, my.sprite.player.y - 150, "bullet");
                this.bulletCount -= 1;
                console.log(`vount: ${this.bulletCount}`);
                this.sound.play("shoot");
            }
            this.count = 0;
        }

        for(let i = 0; i<10; i++){
            if(typeof(this.bullets[i]) == "object"){
                this.bullets[i].y -= 10;
                if(this.bullets[i].y < -20){
                    this.bullets[i] = undefined;
                    if(this.bulletCount < 1){
                        let roundOver = true;
                        for(let y = 0; y<10; y++){
                            if(typeof(this.bullets[y]) == "object"){
                                roundOver = false;
                            }
                        }
                        if(roundOver){
                            this.registry.set('score', this.score);
                            this.scene.start("Level2");
                            console.log(`GG, score: ${this.score}`);
                        }
                    }
                }else if(this.bullets[i].y < 150){
                    for(let t = 0; t<6; t++){
                        if(typeof(this.targets[t]) == "object"){
                            if(Math.abs((this.targets[t].x - this.bullets[i].x)) < 60){
                                console.log("hit");
                                this.targets[t].visible = false;
                                this.targets[t] = undefined;
                                this.bullets[i].visible = false;
                                this.bullets[i] = undefined;
                                this.score += 1;
                                this.sound.play("hit");
                                t=6;
                                let roundOver = true;
                                for(let p = 0; p<6 && roundOver; p++){
                                    if(typeof(this.targets[p]) == "object"){
                                        roundOver = false;
                                    }
                                }
                                if(roundOver){
                                    this.registry.set('score', this.score);
                                    this.scene.start("Level2");
                                    console.log(`GG, score: ${this.score}`);
                                }
                                if(this.bulletCount < 1){
                                    let roundOver = true;
                                    for(let y = 0; y<10; y++){
                                        if(typeof(this.bullets[y]) == "object"){
                                            roundOver = false;
                                        }
                                    }
                                    if(roundOver){
                                        this.registry.set('score', this.score);
                                        this.scene.start("Level2");
                                        console.log(`GG, score: ${this.score}`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.aKey.isDown && my.sprite.player.x > 70){
            my.sprite.player.x -= 10;
        }
        if (this.dKey.isDown && my.sprite.player.x < 1050){
            my.sprite.player.x += 10;
        }
    }

}