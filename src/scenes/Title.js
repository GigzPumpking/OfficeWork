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

        this.add.text(centerX, centerY - 200, 'Office Work', titleConfig).setOrigin(0.5);

        // Add start button
        let startButton = new Button(centerX, centerY + 100, 'CLICK TO START', this, () => {
            this.scene.start('playScene');
        });
        startButton.whiteButton();
        startButton.button.setFontSize(30);

        let creditsButton = new Button(centerX - 200, game.config.height/1.15, 'CREDITS', this, () => {
            this.scene.start('creditScene');
        });
        creditsButton.whiteButton();
        creditsButton.button.setStyle(titleButtonConfig);

        let howtoButton = new Button(centerX + 200, game.config.height/1.15, 'TUTORIAL', this, () => {
            this.scene.start('howtoScene');
        });
        howtoButton.whiteButton();
        howtoButton.button.setStyle(titleButtonConfig);

    
        this.add.text(centerX, game.config.height/1.05, 'Made in Phaser 3.60', titleButtonConfig).setOrigin(0.5);

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