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

        this.createPauseButton();
        this.createBackButton();

        this.paperStackA = this.add.sprite(centerX, centerY, 'paperB').setScale(4);
        this.paperStackB = this.add.sprite(centerX, centerY, 'paperA').setScale(4);

        this.leftTray = this.add.sprite(centerX - 35, centerY, 'leftTray').setScale(5);
        this.rightTray = this.add.sprite(centerX + 35, centerY, 'rightTray').setScale(5);
    }

    update() {
    }

}