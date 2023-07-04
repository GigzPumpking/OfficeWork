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
        this.add.rectangle(0, h - 90, w, 100, 0x000000, 0.4).setOrigin(0, 0);

        // Add another blacker rectangle to the bottom of the screen
        // this will act as the collidable floor
        this.floor = this.add.rectangle(0, h - 50, w, 100, 0x000000, 0).setOrigin(0, 0);
        this.physics.add.existing(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.setFrictionX(1);

        createPauseButton(this);
        createBackButton(this, currScene, prevScene);

        // Create a trash can in the center of the screen
        this.trashCan = this.add.image(centerX, centerY + 100, 'Basket' + trashNum).setScale(3).setDepth(2);
        // Set up rectangle walls around the trash can's left and right sides
        this.trashCanWalls = [];
        this.trashWalls(centerX - 50, this.trashCan.height*this.trashCan.scale);
        this.trashWalls(centerX + 50, this.trashCan.height*this.trashCan.scale);
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
        updateCurrPrev('trashCanScene', 'playScene');

        // if P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }

        // Rotate paperballs in this.paperballs in the direction of their velocity
        this.paperballs.forEach(element => {
            if (element != null) element.rotation = Math.atan2(element.body.velocity.y, element.body.velocity.x);
            // if paperball stops moving, wait 15 seconds then quickly fade it out and destroy it
            if (element != null && element.body.velocity.x == 0 && element.body.velocity.y >= -5 && element.body.velocity.y <= 5) {
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: element,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.paperballs.splice(element, 1);
                            if (element != null) element.destroy();
                        }
                    });
                });
            }
        });
    }

    createPaperball(x, y) {
        let paperball = new Paperball(this, -25, centerY - 150, 'paperball').setDepth(3);

        // Send paperball to the mouse position 
        // Randomize the speed of the paperball
        this.physics.moveTo(paperball, x, y, Math.random() * 100 + 500);

        paperball.body.setDrag(30);

        // Add collision between paperball and floor
        this.physics.add.collider(paperball, this.floor);

        // Add collision between paperball and trashCanWalls
        this.trashCanWalls.forEach(element => {
            this.physics.add.collider(paperball, element);
        });

        // Add collision between paperball and dropZone
        this.physics.add.collider(paperball, this.dropZone, () => {
            // If the paperball is in the dropZone, destroy it
            paperball.destroy();
            this.paperballs.splice(this.paperballs.indexOf(paperball), 1);
            trashFilled++;
            if (trashFilled % 3 == 0) {
                if (trashNum < trashNumMax) trashNum++;
                this.trashCan.setTexture('Basket' + trashNum);
                if (trashNum == trashNumMax && this.trashFULL == null) {
                    // Add a bigger invisible rectangle to cover the trash can and add collision
                    this.trashFULL = this.add.rectangle(centerX, centerY + 125, 125, 200, 0x000000, 0).setOrigin(0.5, 0.5);
                    this.physics.add.existing(this.trashFULL);
                    this.trashFULL.body.immovable = true;
                    this.trashCan.x -= 24;
                    this.trashCan.y -= 10;
                    this.paperballs.forEach(element => {
                        // Add collision between paperball and trashFULL, make paperball bounce off and vibrates trash can
                        this.physics.add.collider(element, this.trashFULL);
                    });
                }
            }
        });
        
        if (this.trashFULL != null) this.physics.add.collider(paperball, this.trashFULL);

        // Set random scale between 2.0 and 3.0
        paperball.setScale(Math.random() + 2.0);
    
        this.paperballs.push(paperball);
    }

    trashFULLcreate() {
        // Add a bigger invisible rectangle to cover the trash can and add collision
        this.trashFULL = this.add.rectangle(centerX, centerY + 125, 125, 200, 0x000000, 0).setOrigin(0.5, 0.5);
        this.physics.add.existing(this.trashFULL);
        this.trashFULL.body.immovable = true;
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