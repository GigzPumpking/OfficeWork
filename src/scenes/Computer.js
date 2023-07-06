class Computer extends Phaser.Scene {
    constructor() {
        super('computerScene');
    }

    createMailButton(num, x, y) {
        return new ButtonCreation(this, centerX + x, centerY + y, 'replyWhite', rescale/1.25, () => {
            if (num == 1 && !mail1Status || num == 2 && !mail2Status || num == 3 && !mail3Status) {
                this.sound.play('buttonPress', { volume: sfxAudio});
                mailNum = num;
                this.scene.pause().launch('mailScene');
            } else this.sound.play('sendMailFail', { volume: sfxAudio});
        });
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
        this.subjectTitleText1 = this.add.text(centerX - 22*rescale, centerY - 22*rescale, "Regarding\nyour raise…", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.subjectTitle2 = this.add.text(centerX - 24*rescale, centerY - 4*rescale, "Subject line #2:\n", { font: 'Courier', fill: '#ffffff' }).setFontSize(4*rescale);
        this.subjectTitleText2 = this.add.text(centerX - 24*rescale, centerY + 2*rescale, "Help,\nthere's an issue!", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.subjectTitle3 = this.add.text(centerX - 24*rescale, centerY + 22*rescale, "Subject line #3:\n", { font: 'Courier', fill: '#ffffff' }).setFontSize(4*rescale);
        this.subjectTitleText3 = this.add.text(centerX - 22*rescale, centerY + 28*rescale, "Hi sweetie!\nIt's your mom.", { font: 'Courier', fill: '#ff0000' }).setFontSize(4*rescale);
        this.mailButton1 = this.createMailButton(1, 30*rescale, -15*rescale);
        this.mailButton2 = this.createMailButton(2, 33*rescale, 7*rescale);
        this.mailButton3 = this.createMailButton(3, 28*rescale, 33*rescale);

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
            this.mailButton1.setTexture('replyGreen');
        } else this.subjectTitleText1.setColor('#ff0000');

        if (mail2Status) {
            this.subjectTitleText2.setColor('#00ff00');
            this.mailButton2.setTexture('replyGreen');
        } else this.subjectTitleText2.setColor('#ff0000');

        if (mail3Status) {
            this.subjectTitleText3.setColor('#00ff00');
            this.mailButton3.setTexture('replyGreen');
        } else this.subjectTitleText3.setColor('#ff0000');
    }

}