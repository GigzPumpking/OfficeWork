// Modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class Coworker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scale) {
        super(scene, x, y, texture, frame, scale);
        scene.add.existing(this);
        this.scene = scene;
        this.scale = scale;
        this.ogScale = this.scale;
        this.moveSpeed = 7;

        // Create animation for coworker
        this.animation = this.anims.create({
            key: 'SilhouetteAnims',
            frames: scene.anims.generateFrameNumbers('SilhouetteAnims', { start: 0, end: 6, first: 0}),
            frameRate: this.moveSpeed,
            repeat: -1
        });
        // Play animation
        this.play('SilhouetteAnims');

        // Every 0.5 seconds, the coworker will move
        this.moveEvent = scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.move();
            },
            loop: true
        });

        this.direction = 'right';
        this.stared = false;
        this.lookedUp1 = false;
        this.lookedUp2 = false;

        this.randX = 0;
        this.randY = 0;

        this.randomize();
    }

    update() {
        if (this.x >= centerX*1.02 && this.x <= centerX*1.06 && !this.stared) {
            // Stop coworker from moving
            this.moveEvent.paused = true;
            // stop animation
            this.anims.stop();

            // Swap coworker to stare sprite
            this.setTexture('SilhouetteSTARE', 0);

            // Wait 7 seconds
            this.scene.time.addEvent({
                delay: 7000,
                callback: () => {
                    // Resume coworker movement
                    this.moveEvent.paused = false;
                    // Resume animation
                    this.anims.play('SilhouetteAnims');
                },
                loop: false
            });
            this.stared = true;
        }

        if (this.x >= this.xRand1 && this.x <= this.xRand1 + 5 && !this.lookedUp1) {
            this.lookUp();
            this.lookedUp1 = true;
        } else if (this.x >= this.xRand2 && this.x <= this.xRand2 + 5 && !this.lookedUp2) {
            this.lookUp();
            this.lookedUp2 = true;
        }
    }

    move() {
        if (this.direction == 'right') {
            this.moveRight();
        } else if (this.direction == 'left') {
            this.moveLeft();
        }

        if (this.x >= w + 50) {
            this.direction = 'left';
            // Randomize scale by 0.9 to 1.1 times ogScale
            this.randomize();
            this.flipX = true;
        }

        if (this.x <= -50) {
            this.direction = 'right';
            this.randomize();
            this.flipX = false;
        }
    }

    randomize() {
        // Randomize scale by 0.9 to 1.1 times ogScale
        this.scale = this.ogScale * (0.9 + Math.random() * 0.2);

        // Generate 2 random locations for the coworker to pause at that is not between centerX*1.02 and centerX*1.06
        this.xRand1 = Math.floor(Math.random() * (w - 100)) + 50;
        this.xRand2 = Math.floor(Math.random() * (w - 100)) + 50;
        while (this.xRand1 >= centerX*1.02 && this.xRand1 <= centerX*1.06) {
            this.xRand1 = Math.floor(Math.random() * (w - 100)) + 50;
        }
        while (this.xRand2 >= centerX*1.02 && this.xRand2 <= centerX*1.06) {
            this.xRand2 = Math.floor(Math.random() * (w - 100)) + 50;
        }
    }

    randomizeSpeed() {
        // Randomize moveSpeed to be a number from 5 to 10
        this.moveSpeed = 5 + Math.floor(Math.random() * 5);
        this.animation.frameRate = this.moveSpeed;
    }

    moveRight() {
        this.x += this.moveSpeed;
        
    }

    moveLeft() {
        this.x -= this.moveSpeed;
    }

    lookUp() {
        this.moveEvent.paused = true;
        this.anims.stop();
        this.setTexture('SilhouetteUP', 0);
        // Randomly choose to flip X or not
        if (Math.random() < 0.5) 
            this.flipX = true;
        else this.flipX = false;

        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.moveEvent.paused = false;
                this.anims.play('SilhouetteAnims');
                if (this.direction == 'right') this.flipX = false;
                else this.flipX = true;
            }
        });
    }
}