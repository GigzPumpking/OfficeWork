class PaperSortingGame extends Phaser.Scene {
    constructor() {
        super('paperSortingGameScene');
    }

    create() {
        currScene = 'paperSortingGameScene';

        this.background = this.add.sprite(centerX, centerY, 'paperSortBG').setScale(rescale);

        this.points = 0;
        this.maxPoints = 10;

        // Generate points text in the top middle of the screen
        this.pointsText = this.add.text(centerX, 30*rescale, 'Points: ' + this.points + '/' + this.maxPoints, { fontFamily: 'Myriad Pro', fill: '#000' }).setFontSize(6.4*rescale).setOrigin(0.5);
        this.sortText = this.add.sprite(centerX, 40*rescale, 'sortText').setAlpha(0).setScale(rescale/1.25);
        jiggle(this, this.sortText);

        // Fade away and delete sort text after 2 seconds
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: this.sortText,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.sortText.destroy();
                }
            });
        }, null, this);

        createPauseButton(this);
        createInventoryButton(this);
        createBackButton(this, currScene, 'playScene');

        this.leftTray = this.add.sprite(centerX - 50*rescale, centerY, 'leftTray').setScale(rescale);
        this.rightTray = this.add.sprite(centerX + 50*rescale, centerY, 'rightTray').setScale(rescale);

        let leftTrayWidth = this.leftTray.width*this.leftTray.scale;
        let leftTrayHeight = this.leftTray.height*this.leftTray.scale;

        let rightTrayWidth = this.rightTray.width*this.rightTray.scale;
        let rightTrayHeight = this.rightTray.height*this.rightTray.scale;

        this.leftTrayRect = new Phaser.Geom.Rectangle(this.leftTray.x - leftTrayWidth/2, this.leftTray.y - leftTrayHeight/2, leftTrayWidth, leftTrayHeight);
        this.rightTrayRect = new Phaser.Geom.Rectangle(this.rightTray.x - rightTrayWidth/2, this.rightTray.y - rightTrayHeight/2, rightTrayWidth, rightTrayHeight);

        this.paperStack = [];
        for (let i = 0; i < this.maxPoints; i++)
        this.createPaperStack();

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        timeUpdate(this);
        updateCurrPrev('paperSortingGameScene', 'playScene');
        // Update points text
        this.pointsText.text = 'Points: ' + this.points + '/' + this.maxPoints;

        if (this.points == this.maxPoints) {
            papersSorted = true;
        }

        // if P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }
    }

    createPaperStack() {
        // Choose random paper sprite between A and B
        let paperSprite = Phaser.Math.Between(1, 2);
        if (paperSprite == 1) paperSprite = 'A';
        else paperSprite = 'B';

        // Create paper sprite
        let paper = this.add.sprite(centerX - 10, centerY, 'paper' + paperSprite).setScale(rescale);

        // Set random rotation between -0.25 and 0.25 degrees
        let rotation = Phaser.Math.FloatBetween(-0.25, 0.25);
        paper.setRotation(rotation);
        paper.setInteractive({ draggable: true });

        paper.on('drag', function (pointer, dragX, dragY) {
            // increase the size of the sprite being dragged
            paper.setScale(rescale*1.1);
            paper.setPosition(dragX, dragY);
        }, this)

        paper.on('dragend', function (pointer, dragX, dragY) {
            this.sound.play('paperThrow', { volume: sfxAudio });
            // reset the scale
            paper.setScale(rescale);
            if (Phaser.Geom.Intersects.RectangleToRectangle(paper.getBounds(), this.leftTrayRect)) {
                paper.setPosition(this.leftTray.x, this.leftTray.y);
                paper.rotation = -0.75;
                this.paperDestroy(paper);
                if (paperSprite == 'A') this.points++;
            }
            else if (Phaser.Geom.Intersects.RectangleToRectangle(paper.getBounds(), this.rightTrayRect)) {
                paper.setPosition(this.rightTray.x, this.rightTray.y);
                paper.rotation = 0.75;
                this.paperDestroy(paper);
                if (paperSprite == 'B') this.points++;
            }
        }, this)

        this.paperStack.push(paper);
    }

    paperDestroy(paper) {
        // Quickly fade alpha to 0 then destroy
        this.tweens.add({
            targets: paper,
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
        });
        this.time.delayedCall(1000, () => {
            paper.destroy();
        }, null, this);
    }
}