class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {

        let creditsY = centerY - 250;
        let ySpacing = 100;
        let xSpacing = 200;

        this.add.text(centerX, creditsY, 'Credits', titleConfig).setOrigin(0.5).setFontSize(50);

        this.add.text(centerX, creditsY + ySpacing/2, 'Game Engine: Phaser 3.60', creditsConfig).setColor('#F1EA2B').setFontSize(20).setOrigin(0.5);

        // People involved
        this.add.text(centerX - xSpacing, creditsY + ySpacing, 'Daphne Cheng: ', creditsConfig).setColor('#39B8FF').setOrigin(0.5);

        this.add.text(centerX - xSpacing, creditsY + 2*ySpacing, 'Abel Goy:', creditsConfig).setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(centerX + xSpacing, creditsY + 2*ySpacing, 'David Carroll:', creditsConfig).setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(centerX - xSpacing, creditsY + 3*ySpacing, 'Albert Rivas: ', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);


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