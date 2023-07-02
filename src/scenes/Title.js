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

        currScene = 'titleScene';

        let buttonScale = 0.8;

        this.add.sprite(centerX, centerY - 200*buttonScale, 'titleText').setScale(buttonScale);

        this.creditsButton = new ButtonCreation(this, centerX - 250*buttonScale, centerY, 'creditsButton', buttonScale, () => {
            this.scene.start('creditScene');
        });

        this.howtoButton = new ButtonCreation(this, centerX + 75*buttonScale, centerY + 137.5*buttonScale, 'tutorialButton', buttonScale, () => {
            this.scene.start('howtoScene');
        });

        this.optionsButton = new ButtonCreation(this, centerX - 250*buttonScale, centerY + 87.5*buttonScale, 'optionsButton', buttonScale, () => {
            // insert Options Menu here
        });

        this.startButton = new ButtonCreation(this, centerX + 75*buttonScale, centerY + 18.75*buttonScale, 'startButton', buttonScale, () => {
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