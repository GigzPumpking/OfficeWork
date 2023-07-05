class Computer extends Phaser.Scene {
    constructor() {
        super('computerScene');
    }

    createMailButton(num, x, y) {
        this.mailButton = new Button(centerX + x, centerY + y, 'Reply', this, textConfig, () => {
            mailNum = num;
            this.scene.pause().launch('mailScene');
        });
        this.mailButton.button.setFontSize(5.4*rescale);
        this.mailButton.whiteButton();
    }

    create() {
        currScene = 'computerScene';
        prevScene = 'playScene';

        whiteNoise.play();

        this.background = this.add.sprite(centerX, centerY, 'computerBG').setScale(rescale);
        this.mailTitle = this.add.sprite(centerX, centerY - rescale, 'mail').setScale(rescale);
        this.inboxScreen = this.add.sprite(centerX - 1.6*rescale, centerY + 4*rescale, 'inbox').setScale(rescale);

        createPauseButton(this);
        createInventoryButton(this);
        createBackButton(this, currScene, prevScene);

        this.subjectTitle1 = this.add.text(centerX - 22*rescale, centerY - 28*rescale, "Subject line #1:\n", { font: 'Courier', fill: '#ffffff' }).setFontSize(4*rescale);
        this.subjectTitleText1 = this.add.text(centerX - 22*rescale, centerY - 22*rescale, "Regarding your raise…", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.subjectTitle2 = this.add.text(centerX - 24*rescale, centerY - 4*rescale, "Subject line #2:\n", { font: 'Courier', fill: '#ffffff' }).setFontSize(4*rescale);
        this.subjectTitleText2 = this.add.text(centerX - 24*rescale, centerY + 2*rescale, "Help, there's an issue!", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.subjectTitle3 = this.add.text(centerX - 24*rescale, centerY + 22*rescale, "Subject line #3:\n", { font: 'Courier', fill: '#ffffff' }).setFontSize(4*rescale);
        this.subjectTitleText3 = this.add.text(centerX - 22*rescale, centerY + 28*rescale, "Hi sweetie! It's your mom.", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.createMailButton(1, 32*rescale, -13*rescale);
        this.createMailButton(2, 35*rescale, 11*rescale);
        this.createMailButton(3, 30*rescale, 36*rescale);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }
        
        timeUpdate(this);

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