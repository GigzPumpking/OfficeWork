class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(40, 15, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create() {
        currScene = 'playScene';
        this.createPauseButton();

        this.computer = new ButtonCreation(this, centerX, centerY, 'Silhouette', 2, () => {
            this.scene.pause().launch('computerScene');
        });
    }

    update() {
        if (currScene != 'playScene') currScene = 'playScene';

        // Press P to pause
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }
    }

}