class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // load background image
        this.load.path = './assets/';

    }

    create() {
        //var menu_sign = this.add.sprite(game.config.width/2,game.config.height/2,'titlebackground').setScale(0.7);

        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '35px',
            color: '#FF9E1A',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let smallConfig = {
            fontFamily: 'Fantasy',
            fontSize: '27px',
            color: '#FFF21A',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Add start button
        let startButton = new Button(game.config.width/2 + 235, 25, 'CLICK TO START', this, () => {
            this.scene.start('playScene');
        });
        startButton.whiteButton();
        startButton.button.setScale(2);

        this.add.text(game.config.width/5, game.config.height/1.15, 'Press C for credits', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.25, game.config.height/1.15, 'Press H for How to play', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.05, 'Made in Phaser 3.60', smallConfig).setOrigin(0.5);

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        this.sound.stopAll();

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // Credits mode
            this.scene.start('creditScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyH)) {
           // How to Play mode
           this.scene.start('howtoScene');    
       }
    }
}