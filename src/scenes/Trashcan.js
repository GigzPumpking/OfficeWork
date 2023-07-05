class Trashcan extends Phaser.Scene {
    constructor() {
        super('trashCanScene');
    }

    create() {
        currScene = 'trashCanScene';
        prevScene = 'playScene';

        dimBG(this, 0.8);
        this.dimBG.setFillStyle(0xFFFFFF, 0.8);

        // Add a black rectangle to the bottom of the screen
        this.add.rectangle(0, h - 9*rescale, w, 10*rescale, 0x000000, 0.4).setOrigin(0, 0);

        // Add another blacker rectangle to the bottom of the screen
        // this will act as the collidable floor
        this.floor = this.add.rectangle(0, h - 5*rescale, w, 10*rescale, 0x000000, 0).setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.immovable = true;

        createPauseButton(this);
        createBackButton(this, currScene, prevScene);
        createInventoryButton(this);

        // Create a trash can in the center of the screen
        this.trashcan = this.add.image(centerX, centerY + 23.5*rescale, 'Basket' + trashNum).setScale(rescale/1.5).setDepth(2);

        let trashWidth = this.trashcan.width*this.trashcan.scale;
        let trashHeight = this.trashcan.height*this.trashcan.scale;

        // Set up rectangle walls around the trash can's left and right sides
        this.trashcanWalls = [];
        this.trashWalls(this.trashcan.x - trashWidth/2.75, trashHeight);
        this.trashWalls(this.trashcan.x + trashWidth/2.75, trashHeight);
        this.trashWalls(w + rescale, h);
        this.trashcanWalls[2].y = 0;

        if (trashNum != trashNumMax) this.trashFULL = null;
        else this.trashFULLcreate();

        if (!trashBurning) this.flames = null;
        else this.fireStart();

        // place invisible rectangle over trash can to act as a drop zone
        this.dropZone = this.add.rectangle(centerX, centerY + 12.5*rescale, 8*rescale, 10*rescale, 0x000000, 0).setOrigin(0.5, 0.5);
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

    fireStart() {
        // Play fire start sound
        this.sound.play('fireStart', {volume: sfxAudio});
        this.flames = this.add.sprite(this.trashcan.x, this.trashcan.y + 7.5*rescale, 'fireBasketStart').setScale(flamesScale).setDepth(4);
        if (trashNum == trashNumMax) this.flames.x = this.trashcan.x + 5*rescale;
        this.flames.anims.play('fireBasketStart');
        this.flames.on('animationcomplete', () => {
            this.flames.anims.play('fireBasketIdle');
        });
    }

    createPaperball(x, y) {
        let paperball = new Paperball(this, -2.5*rescale, centerY - 30*rescale, paperballStatus).setDepth(3);

        // Play paperball throw sound
        this.sound.play('paperThrow', {volume: sfxAudio});

        // Send paperball to the mouse position 
        // Randomize the speed of the paperball
        this.physics.moveTo(paperball, x, y, Math.random() * 40*rescale + 80*rescale);

        paperball.body.setDrag(3*rescale);

        // Add collision between paperball and floor
        this.physics.add.collider(paperball, this.floor);

        // Add collision between paperball and trashCanWalls
        this.trashcanWalls.forEach(element => {
            if (element != this.trashcanWalls[2]) {
                this.physics.add.collider(paperball, element, () => {
                    // if the paperball is burning, add flames
                    if (paperball.burning && this.flames == null) {
                        this.fireStart();
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
                this.fireStart();
            } else if (paperball.burning && this.flames != null) {
                if (flamesScale < maxFlamesScale) {
                    flamesScale += 0.05*rescale;
                    this.flames.setScale(flamesScale);
                    this.flames.y -= 0.75*rescale;
                }
            }

            trashFilled++;
            if (trashFilled % 3 == 0) {
                if (trashNum < trashNumMax) trashNum++;
                this.trashcan.setTexture('Basket' + trashNum);
                if (trashNum == trashNumMax && this.trashFULL == null) {
                    this.trashFULLcreate();
                }
            }
        });
    
        this.paperballs.push(paperball);
    }

    trashFULLcreate() {
        this.trashcan.x = centerX - 5.25*rescale;
        this.trashcan.y = centerY + 21.2*rescale;
    }

    trashWalls(x, height) {
        let wall = this.add.rectangle(x, centerY, rescale, height, 0x000000, 0).setOrigin(0, 0);
        this.physics.add.existing(wall);
        wall.body.immovable = true;
        this.trashcanWalls.push(wall);
    }
}