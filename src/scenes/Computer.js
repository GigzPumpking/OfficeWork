class Computer extends Phaser.Scene {
    constructor() {
        super('computerScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(50, 25, 'Pause', this, textConfig, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
        this.pauseButton.button.setBackgroundColor('#000000');
    }

    createMailButton(num, x, y) {
        this.mailButton = new Button(centerX + x, centerY + y, 'Reply', this, textConfig, () => {
            mailNum = num;
            this.scene.pause().launch('mailScene');
        });
        this.mailButton.button.setFontSize(30);
        this.mailButton.whiteButton();
    }

    create() {
        currScene = 'computerScene';
        prevScene = 'playScene';

        whiteNoise.play();

        this.background = this.add.sprite(centerX, centerY, 'computerBG');
        this.mailTitle = this.add.sprite(centerX, centerY - 1, 'mail').setScale(5.15);
        this.inboxScreen = this.add.sprite(centerX - 8, centerY + 24.55, 'inbox').setScale(5.15);
        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.createPauseButton();
        createBackButton(this, currScene, prevScene);

        this.subjectTitle1 = this.add.text(centerX - 110, centerY - 140, "Subject line #1:\n", { font: '20px Courier', fill: '#ffffff' });
        this.subjectTitleText1 = this.add.text(centerX - 110, centerY - 110, "Regarding your raise…", { font: '20px Courier', fill: '#ff0000' });
        this.subjectTitle2 = this.add.text(centerX - 120, centerY - 20, "Subject line #2:\n", { font: '20px Courier', fill: '#ffffff' });
        this.subjectTitleText2 = this.add.text(centerX - 120, centerY + 10, "Help, there's an issue!", { font: '20px Courier', fill: '#ff0000' });
        this.subjectTitle3 = this.add.text(centerX - 120, centerY + 110, "Subject line #3:\n", { font: '20px Courier', fill: '#ffffff' });
        this.subjectTitleText3 = this.add.text(centerX - 120, centerY + 140, "Hi sweetie! It's your mom.", { font: '20px Courier', fill: '#ff0000' });
        this.createMailButton(1, 190, -60);
        this.createMailButton(2, 170, 60);
        this.createMailButton(3, 160, 185);
    }

    update() {
        updateCurrPrev('computerScene', 'playScene');

        if (mail1Status) {
            this.subjectTitleText1.setColor('#00ff00');
        } else this.subjectTitleText1.setColor('#ff0000');

        if (mail2Status) {
            this.subjectTitleText2.setColor('#00ff00');
        } else this.subjectTitleText2.setColor('#ff0000');

        if (mail3Status) {
            this.subjectTitleText3.setColor('#00ff00');
        } else this.subjectTitleText3.setColor('#ff0000');
    }

}