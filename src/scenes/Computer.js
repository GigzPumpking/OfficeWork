class Computer extends Phaser.Scene {
    constructor() {
        super('computerScene');
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
            this.scene.stop('computerScene');
            this.scene.resume('playScene');
        });
        this.backButton.button.setFontSize(30);
        this.backButton.whiteButton();
    }

    createMailButton(num, x, y) {
        this.mailButton = new Button(centerX + x, centerY + y, 'Reply', this, () => {
            mailNum = num;
            this.scene.pause().launch('mailScene');
        });
        this.mailButton.button.setFontSize(30);
        this.mailButton.whiteButton();
    }

    create() {
        currScene = 'computerScene';

        this.background = this.add.sprite(centerX, centerY, 'computer');
        this.mailTitle = this.add.sprite(centerX, centerY - 1, 'mail').setScale(5.15);
        this.inboxScreen = this.add.sprite(centerX - 7, centerY + 25, 'inbox').setScale(5.15);
        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.createPauseButton();
        this.createBackButton();
        this.createMailButton(1, 190, -60);
        this.createMailButton(2, 170, 60);
        this.createMailButton(3, 160, 185);
    }

    update() {
        if (currScene != 'computerScene') currScene = 'computerScene';
    }

}