class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'inventoryScene' })
    }

    create() {
        dimBG(this, 0.9);
        // Change the color of the rectangle dimBG
        this.dimBG.setFillStyle(0xFFFFFF, 0.9);

        this.mainText = this.add.text(centerX, centerY - 200, 'Inventory', pauseConfig).setOrigin(0.5);

        this.xOffset = centerX - 225;
        this.yOffset = centerY - 50;
        this.gap = 150;

        // Add 4 blank rectangles to the scene to represent the inventory slots

        this.inventory1 = this.add.rectangle(this.xOffset, this.yOffset, 100, 100, 0x000000, 0.5);

        this.inventory2 = this.add.rectangle(this.xOffset + this.gap, this.yOffset, 100, 100, 0x000000, 0.5);

        this.inventory3 = this.add.rectangle(this.xOffset + 2*this.gap, this.yOffset, 100, 100, 0x000000, 0.5);

        this.inventory4 = this.add.rectangle(this.xOffset + 3*this.gap, this.yOffset, 100, 100, 0x000000, 0.5);

        this.cigbox = null;
        this.lighter = null;

        // Add the items to the inventory slots based off of the inventory array

        this.cigboxItem();
        this.lighterItem();

        this.resume = new Button(centerX, centerY + 100, 'Resume', this, textConfig, () => {
            this.scene.resume(currScene).stop();
        })
        this.resume.button.setFontSize(30);
        this.resume.blackButton();
    }

    update() {

    }

    cigaretteInitiate() {
        this.hideEverything();

        // Add a rectangle with alpha 0.5 to create a dark background
        this.dim = this.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5).setOrigin(0.5);

        // Create smoking cig sprite and anims
        this.smokingCig = this.add.sprite(centerX, centerY, 'SmokingCigAnims');
        this.smokingCig.displayWidth = w;
        this.smokingCig.displayHeight = h;
        this.smokingCig.anims.create({
            key: 'SmokingCigAnims',
            frames: this.anims.generateFrameNumbers('SmokingCigAnims', { start: 0, end: 33, first: 0}),
            frameRate: 10,
            repeat: 0
        });
        this.smokingCig.anims.play('SmokingCigAnims');

        // Once the animation is done, destroy the cig sprite
        this.smokingCig.on('animationcomplete', () => {
            // Wait on the last frame for 1 second
            this.time.delayedCall(1000, () => {
                // Quickly fade then destroy
                this.tweens.add({
                    targets: this.smokingCig,
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        if (cigsSmoked != maxCigsSmoked) cigsSmoked++;
                        this.smokingCig.destroy();
                        this.dim.destroy();
                        this.scene.resume(currScene).stop();
                    }
                });

            }, null, this);
        });
    }

    cigboxItem() {
        if (inventory.includes('cigbox')) {
            // Create the cigbox item using the inventory array
            let index = inventory.indexOf('cigbox');
            this.cigbox = new ButtonCreation(this, this.xOffset + this.gap*index, this.yOffset, inventory[index], 5, () => {
                if (inventory.includes('lighter')) {
                    this.cigaretteInitiate();
                }
            })
        }
    }

    lighterItem() {
        if (inventory.includes('lighter')) {
            // Create the lighter item using the inventory array
            let index = inventory.indexOf('lighter');
            this.lighter = new ButtonCreation(this, this.xOffset + this.gap*index, this.yOffset, inventory[index], 5, () => {
                if (currScene == 'trashCanScene') {
                    paperballStatus = 'fireBallThrown';
                    this.scene.resume(currScene).stop();
                }
            })
        }
    }

    hideEverything() {
        // Hide everything on the screen
        this.dimBG.alpha = 0;
        this.inventory1.alpha = 0;
        this.inventory2.alpha = 0;
        this.inventory3.alpha = 0;
        this.inventory4.alpha = 0;
        this.mainText.alpha = 0;
        this.resume.button.alpha = 0;
        if (this.cigbox != null) this.cigbox.alpha = 0;
        if (this.lighter != null) this.lighter.alpha = 0;
    }
}
