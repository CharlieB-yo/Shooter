class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
        this.my = {sprite: {}};
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");


        this.load.image("duck", "duck_brown.png");
    }

    create() {
        this.score = this.registry.get('score');
        let my = this.my;   // create an alias to this.my for readability
        this.dKey = this.input.keyboard.addKey(68);
        this.aKey = this.input.keyboard.addKey(65);
        this.Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bullets = new Array(10);

        this.targets = new Array(5);
        for(let i = 1; i<7; i++){
            this.targets[i-1] = this.add.sprite((1000/7) * i, 75, "target");
        }

        this.ducks = new Array(4);
        this.curves = new Array(4);
        this.curves[0] = new Phaser.Curves.Spline([100, 250, 500, 150, 900, 250, 500, 350, 100, 250]);
        this.curves[1] = new Phaser.Curves.Spline([500, 150, 900, 250, 500, 350, 100, 250, 500, 150]);
        this.curves[2] = new Phaser.Curves.Spline([500, 350, 100, 250, 500, 150, 900, 250, 500, 350]);
        this.curves[3] = new Phaser.Curves.Spline([900, 250, 500, 350, 100, 250, 500, 150, 900, 250]);
        for(let i = 0; i<4; i++){
            this.ducks[i] = this.add.follower(this.curves[i], this.curves[i].points[0].x, this.curves[i].points[0].y, "duck");
            this.ducks[i].setScale(0.65);
            this.ducks[i].startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 5000,
                ease: 'Linear',
                repeat: -1,
            });
        }

        this.duckbullets = new Array(5);

        

        this.count = 0;
        this.duckcounter = 0;
        this.bulletCount = 10;

        my.sprite.player = this.add.sprite(500, 850, "player");
        console.log(typeof(my.sprite.player));
        //my.sprite.bullet = this.add.sprite(500, 650, "bullet");
    }

    update() {
        this.count += 1;
        this.duckcounter += 1;
        let my = this.my;    // create an alias to this.my for readability
        if (this.count >= 10 && this.Space.isDown && this.bulletCount > 0){
            let i = 0;
            while(i<10 && typeof(this.bullets[i]) == "object"){
                i += 1;
            }
            if(i < 10){
                this.bullets[i] = this.add.sprite(my.sprite.player.x-60, my.sprite.player.y - 150, "bullet");
                this.bulletCount -= 1;
                this.sound.play("shoot");
                console.log(`vount: ${this.bulletCount}`);
            }
            this.count = 0;
        }

        if(this.duckcounter >= 10){
            for(let i = 0; i<4; i++){
                if(typeof(this.ducks[i]) == "object" && Math.random() > 0.92){
                    let b = 0
                    while(b<5 && typeof(this.duckbullets[b]) == "object"){
                        b++;
                    }
                    if(b<5){
                        this.duckbullets[b] = this.add.sprite(this.ducks[i].x, this.ducks[i].y, "bullet");
                        this.duckbullets[b].flipY = true;
                        this.sound.play("shoot");
                    }
                }
            }
            this.duckcounter = 0;
        }

        for(let i = 0; i<5; i++){
            if(typeof(this.duckbullets[i]) == "object"){
                this.duckbullets[i].y += 10;
                if(this.duckbullets[i].y > 825){
                    this.duckbullets[i].visible = false;
                    this.duckbullets[i] = undefined;
                }
                else if(this.duckbullets[i].y > 700 && Math.abs(this.duckbullets[i].x - (this.my.sprite.player.x-18)) < 42){
                    this.duckbullets[i].visible = false;
                    this.duckbullets[i] = undefined;
                    this.bulletCount -=1;
                    this.sound.play("hit");
                    if(this.bulletCount < 1){
                        let roundOver = true;
                        for(let y = 0; y<10; y++){
                            if(typeof(this.bullets[y]) == "object"){
                                roundOver = false;
                            }
                        }
                        if(roundOver){
                            this.registry.set('score', this.score);
                            this.scene.start("Level3");
                            console.log(`GG, score: ${this.score}`);
                        }
                    }
                }
            }
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
                            this.scene.start("Level3");
                            console.log(`GG, score: ${this.score}`);
                        }
                    }
                }else if(this.bullets[i].y < 400){
                    for(let t = 0; t<6; t++){
                        if(typeof(this.targets[t]) == "object"){
                            if(Math.abs((this.targets[t].x - this.bullets[i].x)) < 60 && Math.abs((this.targets[t].y - this.bullets[i].y)) < 50){
                                console.log("hit");
                                this.targets[t].visible = false;
                                this.targets[t] = undefined;
                                this.bullets[i].visible = false;
                                this.bullets[i] = undefined;
                                this.sound.play("hit");
                                this.score += 1;
                                t=6;
                                let roundOver = true;
                                for(let p = 0; p<6 && roundOver; p++){
                                    if(typeof(this.targets[p]) == "object"){
                                        roundOver = false;
                                    }
                                }
                                for(let d = 0; d<4 && roundOver; d++){
                                    if(typeof(this.ducks[d]) == "object"){
                                        roundOver = false;
                                    }
                                }
                                if(roundOver){
                                    this.registry.set('score', this.score);
                                    console.log("GG");
                                    this.scene.start("Level3");
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
                                        this.scene.start("Level3");
                                        console.log(`GG, score: ${this.score}`);
                                    }
                                }
                            }
                        }
                    }
                    if(typeof(this.bullets[i]) == "object"){
                        for(let t = 0; t<4; t++){
                            if(typeof(this.ducks[t]) == "object"){
                                if(Math.abs((this.ducks[t].x - this.bullets[i].x)) < 40 && Math.abs((this.ducks[t].y - this.bullets[i].y)) < 20){
                                    console.log("duck hit");
                                    this.ducks[t].visible = false;
                                    this.ducks[t] = undefined;
                                    this.bullets[i].visible = false;
                                    this.bullets[i] = undefined;
                                    this.sound.play("hit");
                                    this.score += 3;
                                    t=4;
                                    let roundOver = true;
                                    for(let p = 0; p<6 && roundOver; p++){
                                        if(typeof(this.targets[p]) == "object"){
                                            roundOver = false;
                                        }
                                    }
                                    for(let d = 0; d<4 && roundOver; d++){
                                        if(typeof(this.ducks[d]) == "object"){
                                            roundOver = false;
                                        }
                                    }
                                    if(roundOver){
                                        this.registry.set('score', this.score);
                                        console.log("GG");
                                        this.scene.start("Level3");
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
                                            this.scene.start("Level3");
                                            console.log(`GG, score: ${this.score}`);
                                        }
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