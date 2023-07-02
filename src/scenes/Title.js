class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // load background image
        this.load.path = './assets/';
        this.load.image('titleText', 'images/UI/title_text.png');
        this.load.image('creditsButton', 'images/UI/credits_button.png');
        this.load.image('tutorialButton', 'images/UI/how_to_play_button.png');
        this.load.image('optionsButton', 'images/UI/options_button.png');
        this.load.image('startButton', 'images/UI/start_button.png');
    }

    create() {

        this.add.sprite(centerX, centerY - 180, 'titleText').setScale(0.8);

        this.creditsButton = new ButtonCreation(this, centerX - 200, centerY, 'creditsButton', 0.8, () => {
            this.scene.start('creditScene');
        });

        this.howtoButton = new ButtonCreation(this, centerX + 60, centerY + 110, 'tutorialButton', 0.8, () => {
            this.scene.start('howtoScene');
        });

        this.optionsButton = new ButtonCreation(this, centerX - 200, centerY + 70, 'optionsButton', 0.8, () => {
            // insert Options Menu here
        });

        this.startButton = new ButtonCreation(this, centerX + 60, centerY + 15, 'startButton', 0.8, () => {
            this.scene.start('playScene');
        });

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        this.sound.stopAll();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) 
            this.scene.start('creditScene');    
        
        if (Phaser.Input.Keyboard.JustDown(keyH)) 
           this.scene.start('howtoScene');    
    }
}