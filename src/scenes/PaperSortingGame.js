class PaperSortingGame extends Phaser.Scene {
    constructor() {
        super('paperSortingGameScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(40, 15, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
    }

    createBackButton() {
        this.backButton = new Button(w - 40, 15, 'Back', this, () => {
            this.scene.stop('paperSortingGameScene');
            this.scene.resume('playScene');
        });
        this.backButton.button.setFontSize(24);
        this.backButton.whiteButton();
    }

    create() {
        currScene = 'paperSortingGameScene';

        this.background = this.add.sprite(centerX, centerY, 'paperSortBG');
        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.points = 0;
        this.maxPoints = 10;

        // Generate points text in the top middle of the screen
        this.pointsText = this.add.text(centerX, 50, 'Points: ' + this.points + '/' + this.maxPoints, { fontFamily: 'Myriad Pro', fontSize: '32px', fill: '#000' }).setOrigin(0.5);

        this.createPauseButton();
        this.createBackButton();

        this.leftTray = this.add.sprite(centerX - 230, centerY, 'leftTray').setScale(5);
        this.rightTray = this.add.sprite(centerX + 200, centerY, 'rightTray').setScale(5);

        this.leftTrayRect = new Phaser.Geom.Rectangle(centerX - 230, centerY - 150, 200, 300);
        this.rightTrayRect = new Phaser.Geom.Rectangle(centerX + 200, centerY - 150, 200, 300);

        this.paperStack = [];
        for (let i = 0; i < this.maxPoints; i++)
        this.createPaperStack();

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        // Update points text
        this.pointsText.text = 'Points: ' + this.points + '/' + this.maxPoints;

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
        let paper = this.add.sprite(centerX - 10, centerY, 'paper' + paperSprite).setScale(4);

        // Set random rotation between -0.25 and 0.25 degrees
        let rotation = Phaser.Math.FloatBetween(-0.25, 0.25);
        paper.setRotation(rotation);
        paper.setInteractive({ draggable: true });

        paper.on('drag', function (pointer, dragX, dragY) {
            // increase the size of the sprite being dragged
            paper.setScale(4.5);
            paper.setPosition(dragX, dragY);
        }, this)

        paper.on('dragend', function (pointer, dragX, dragY) {
            // reset the scale
            paper.setScale(4);
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