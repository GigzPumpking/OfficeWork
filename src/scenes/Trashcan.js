class Trashcan extends Phaser.Scene {
    constructor() {
        super('trashCanScene');
    }

    create() {
        currScene = 'trashCanScene';
        prevScene = 'playScene';

        if (!trashBurning) this.flames = null;
        else {
            // Play fire start sound
            this.sound.play('fireStart', {volume: sfxAudio});
            this.flames = this.add.sprite(this.trashCan.x, this.trashCan.y + 20, 'fireBasketStart').setScale(flamesScale).setDepth(4);
            this.flames.anims.play('fireBasketStart');
            this.flames.on('animationcomplete', () => {
                this.flames.anims.play('fireBasketIdle');
            });
        }

        dimBG(this, 0.8);
        this.dimBG.setFillStyle(0xFFFFFF, 0.8);

        // Add a black rectangle to the bottom of the screen
        this.add.rectangle(0, h - 90, w, 100, 0x000000, 0.4).setOrigin(0, 0);

        // Add another blacker rectangle to the bottom of the screen
        // this will act as the collidable floor
        this.floor = this.add.rectangle(0, h - 50, w, 100, 0x000000, 0).setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.immovable = true;

        createPauseButton(this);
        createBackButton(this, currScene, prevScene);
        createInventoryButton(this);

        // Create a trash can in the center of the screen
        this.trashCan = this.add.image(centerX, centerY + 100, 'Basket' + trashNum).setScale(3).setDepth(2);
        // Set up rectangle walls around the trash can's left and right sides
        this.trashCanWalls = [];
        this.trashWalls(centerX - 60, this.trashCan.height*this.trashCan.scale);
        this.trashWalls(centerX + 60, this.trashCan.height*this.trashCan.scale);
        this.trashWalls(w + 10, h);
        this.trashCanWalls[2].y = 0;

        if (trashNum != trashNumMax) this.trashFULL = null;
        else this.trashFULLcreate();

        // place invisible rectangle over trash can to act as a drop zone
        this.dropZone = this.add.rectangle(centerX, centerY + 125, 80, 100, 0x000000, 0).setOrigin(0.5, 0.5);
        this.physics.add.existing(this.dropZone);
        this.dropZone.body.immovable = true;

        this.paperballs = [];

        // Create a paper ball where the mouse is clicked
        this.input.on('pointerdown', () => {
            this.createPaperball(game.input.mousePointer.x, game.input.mousePointer.y);
        });

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        if (this.flames != null) trashBurning = true;

        updateCurrPrev('trashCanScene', 'playScene');

        // if P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }

        // Rotate paperballs in this.paperballs in the direction of their velocity
        this.paperballs.forEach(element => {
            element.update();
        });
    }

    createPaperball(x, y) {
        let paperball = new Paperball(this, -25, centerY - 150, paperballStatus).setDepth(3);

        // Play paperball throw sound
        this.sound.play('paperThrow', {volume: sfxAudio});

        // Send paperball to the mouse position 
        // Randomize the speed of the paperball
        this.physics.moveTo(paperball, x, y, Math.random() * 100 + 500);

        paperball.body.setDrag(30);

        // Add collision between paperball and floor
        this.physics.add.collider(paperball, this.floor);

        // Add collision between paperball and trashCanWalls
        this.trashCanWalls.forEach(element => {
            if (element != this.trashCanWalls[2]) {
                this.physics.add.collider(paperball, element, () => {
                    // if the paperball is burning, add flames
                    if (paperball.burning && this.flames == null) {
                        this.sound.play('fireStart', {volume: sfxAudio});
                        this.flames = this.add.sprite(this.trashCan.x, this.trashCan.y + 20, 'fireBasketStart').setScale(flamesScale).setDepth(4);
                        this.flames.anims.play('fireBasketStart');
                        this.flames.on('animationcomplete', () => {
                            this.flames.anims.play('fireBasketIdle');
                        });
                    }
                });
            }
            else this.physics.add.collider(paperball, element);
        });

        // Add collision between paperball and dropZone
        this.physics.add.collider(paperball, this.dropZone, () => {
            // If the paperball is in the dropZone, destroy it
            this.paperballs.splice(this.paperballs.indexOf(paperball), 1);
            paperball.destroy();

            // if the paperball is burning, add flames
            if (paperball.burning && this.flames == null) {
                this.sound.play('fireStart', {volume: sfxAudio});
                this.flames = this.add.sprite(this.trashCan.x, this.trashCan.y + 20, 'fireBasketStart').setScale(flamesScale).setDepth(4);
                this.flames.anims.play('fireBasketStart');
                this.flames.on('animationcomplete', () => {
                    this.flames.anims.play('fireBasketIdle');
                });
            } else if (paperball.burning && this.flames != null) {
                if (flamesScale < maxFlamesScale) {
                    flamesScale += 0.1;
                    this.flames.setScale(flamesScale);
                }
            }

            trashFilled++;
            if (trashFilled % 3 == 0) {
                if (trashNum < trashNumMax) trashNum++;
                this.trashCan.setTexture('Basket' + trashNum);
                if (trashNum == trashNumMax && this.trashFULL == null) {
                    this.trashFULLcreate();
                }
            }
        });

        // Set random scale between 2.0 and 3.0
        paperball.setScale(Math.random() + 2.0);
    
        this.paperballs.push(paperball);
    }

    trashFULLcreate() {
        this.trashCan.x -= 24;
        this.trashCan.y -= 10;
    }

    trashWalls(x, height) {
        let wall = this.add.rectangle(x, centerY, 10, height, 0x000000, 0).setOrigin(0, 0);
        this.physics.add.existing(wall);
        wall.body.immovable = true;
        this.trashCanWalls.push(wall);
    }
}