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

        this.add.text(centerX, creditsY + ySpacing, 'Albert Rivas: Original Game Idea, Design, Pixel Art/Animations', creditsConfig).setColor('#EAAD2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + 1.5*ySpacing, 'Daphne Cheng: Pixel Art Background', creditsConfig).setColor('#39B8FF').setOrigin(0.5);

        this.add.text(centerX, creditsY + 2*ySpacing, 'Abel Goy: Programming , Design , Production', creditsConfig).setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + 2.5*ySpacing, 'David Carroll: Brainstorming , Design', creditsConfig).setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + 3*ySpacing, 'Aidan Bacon: Menu Design Art , Pixel Art', creditsConfig).setColor('#39B8FF').setOrigin(0.5);

        this.add.text(centerX, creditsY + 3.5*ySpacing, 'Hung Nguyen: Programming', creditsConfig).setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(centerX, creditsY + 4*ySpacing, 'Ben Daly: Music', creditsConfig).setColor('#26D135').setOrigin(0.5);

        this.add.text(centerX, creditsY + 4.5*ySpacing, 'Evan Pompa: Pixel Art', creditsConfig).setColor('#39B8FF').setOrigin(0.5);

        let MainMenu = new Button(centerX, centerY + 245, 'Back to Main Menu', this, () => {
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