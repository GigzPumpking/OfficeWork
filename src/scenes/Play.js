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

        this.person = this.add.sprite(centerX, centerY, 'Silhouette').setScale(2).setInteractive();
        this.person.on('pointerdown', () => {
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