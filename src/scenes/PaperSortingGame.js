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
        this.backButton = new Button(centerX, centerY + 245, 'Back', this, () => {
            this.scene.stop('paperSortingGameScene');
            this.scene.resume('playScene');
        });
        this.backButton.button.setFontSize(30);
        this.backButton.whiteButton();
    }

    create() {
        currScene = 'paperSortingGameScene';
    }

    update() {
    }

}