class Trashcan extends Phaser.Scene {
    constructor() {
        super('trashCanScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(40, 25, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
        this.pauseButton.button.setBackgroundColor('#000000');
    }

    createBackButton() {
        this.backButton = new Button(w - 40, 25, 'Back', this, () => {
            this.scene.stop('trashCanScene');
            this.scene.resume('playScene');
        });
        this.backButton.button.setFontSize(24);
        this.backButton.whiteButton();
        this.backButton.button.setBackgroundColor('#000000');
    }

    create() {
        currScene = 'trashCanScene';

        this.createPauseButton();
        this.createBackButton();

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {

        // if P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }
    }
}