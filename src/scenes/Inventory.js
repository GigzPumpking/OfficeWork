class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'inventoryScene' })
    }

    create() {
        prevScene = currScene;
        currScene = 'inventoryScene';

        dimBG(this, 0.9);
        // Change the color of the rectangle dimBG
        this.dimBG.setFillStyle(0xFFFFFF, 0.9);

        // Create the inventory menu
        this.inventoryMenu = this.add.sprite(centerX, centerY, 'inventory').setScale(rescale);

        this.xOffset = centerX - 35*rescale;
        this.yOffset = centerY - rescale;
        this.gap = 25*rescale;

        // Add 4 blank rectangles to the scene to represent the inventory slots

        this.inventory1 = this.add.sprite(this.xOffset, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory2 = this.add.sprite(this.xOffset + this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory3 = this.add.sprite(this.xOffset + 2*this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.inventory4 = this.add.sprite(this.xOffset + 3*this.gap, this.yOffset, 'inventoryBox').setScale(rescale);

        this.cigbox = null;
        this.lighter = null;

        // Add the items to the inventory slots based off of the inventory array

        this.cigboxItem();
        this.lighterItem();

        this.resume = new ButtonCreation(this, centerX + rescale/2, centerY + 15*rescale, 'resume', rescale, () => {
            this.scene.resume(prevScene).stop();
        })
    }

    update() {
        timeUpdate(this);
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

        // Play cigarette burn sound on the 10th frame
        this.smokingCig.on('animationupdate', () => {
            if (this.smokingCig.anims.currentFrame.index == 10) {
                this.sound.play('cigBurn', { volume: 2*sfxAudio });
            }
        });

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
                        this.scene.resume(prevScene).stop();
                    }
                });

            }, null, this);
        });
    }

    cigboxItem() {
        if (inventory.includes('cigbox')) {
            // Create the cigbox item using the inventory array
            let index = inventory.indexOf('cigbox');
            this.cigbox = new ButtonCreation(this, this.xOffset + this.gap*index, this.yOffset, inventory[index], rescale, () => {
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
            this.lighter = new ButtonCreation(this, this.xOffset + this.gap*index, this.yOffset, inventory[index], rescale, () => {
                if (prevScene == 'trashCanScene') {
                    paperballStatus = 'fireBallThrown';
                    this.scene.resume(prevScene).stop();
                }
            })
        }
    }

    hideEverything() {
        // Hide everything on the screen
        this.dimBG.alpha = 0;
        this.inventoryMenu.alpha = 0;
        this.inventory1.alpha = 0;
        this.inventory2.alpha = 0;
        this.inventory3.alpha = 0;
        this.inventory4.alpha = 0;
        this.resume.alpha = 0;
        if (this.cigbox != null) this.cigbox.alpha = 0;
        if (this.lighter != null) this.lighter.alpha = 0;
    }
}
