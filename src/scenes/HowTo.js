class HowTo extends Phaser.Scene {
    constructor() {
        super('howtoScene');
    }

    create() {

        this.add.text(centerX, centerY - 250, 'How To Play', titleConfig).setOrigin(0.5).setFontSize(50);

        let MainMenu = new Button(centerX, centerY + 225, 'Main Menu', this, () => {
            this.scene.stop('playScene');
            this.scene.start('titleScene');
        })
        MainMenu.button.setFontSize(30);
        MainMenu.whiteButton();

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }
}
