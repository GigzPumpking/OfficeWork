class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('Person', 'silhouette_sprites/silhouette_3.png');
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

        this.person = this.add.sprite(centerX, centerY, 'Person').setScale(2).setInteractive();
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