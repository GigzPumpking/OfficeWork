class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        let smallConfig = {
            fontFamily: 'Verdana',
            fontSize: '27px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(game.config.width/2, game.config.height/29, 'Credits', menuConfig).setOrigin(0.5).setFontFamily('Belanosima').setFontSize(39);
        this.add.text(game.config.width/2, 2*game.config.height/19, 'Game Engine: Phaser 3.60', smallConfig).setOrigin(0.5).setColor('#F1EA2B');

        // People involved
        this.add.text(game.config.width/2, 3.1*game.config.height/15, 'Daphne Cheng: ', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#39B8FF').setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/3.5, 3.25*game.config.height/9, 'Abel Goy:', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#EA2B2B').setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/1.3, 3.25*game.config.height/9, 'David Carroll:', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(game.config.width/1.3, 4.3*game.config.height/9, 'Albert Rivas: ', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#EAAD2B').setAlign('center').setOrigin(0.5);


        // instructions
        this.add.text(game.config.width/1.35, 8.7*game.config.height/9, 'Press ESC to return to the title screen menu', smallConfig).setOrigin(1.1).setFontSize(22);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }

}