class HowTo extends Phaser.Scene {
    constructor() {
        super('howtoScene');
    }

    create() {
        var menuConfig = {
            fontFamily: 'Belanosima',
            fontSize: '28px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        let small

        this.add.text(game.config.width/2, game.config.height/9, 'How To Play', menuConfig).setOrigin(0.5);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.text(game.config.width/2, game.config.height/3 + 300, 'Press ESC to return to the menu', menuConfig).setOrigin(0.5);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }
}
