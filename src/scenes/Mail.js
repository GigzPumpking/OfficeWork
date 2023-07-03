class Mail extends Phaser.Scene {
    constructor() {
        super('mailScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(40, 15, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
    }

    createBackButton() {
        this.backButton = new Button(centerX, centerY + 245, 'Back', this, () => {
            this.scene.stop('mailScene');
            this.scene.resume('computerScene');
        });
        this.backButton.button.setFontSize(30);
    }

    createBlinkingLine() {
        this.lineXOffset = 245;
        this.lineYOffset = this.textYOffset - 30;
        this.blinkingLine = this.add.text(this.lineXOffset, this.lineYOffset, '|', { font: '28px Courier', fill: '#ffff00' });
        this.blinkingLine.alpha = 0;
        this.blinkingLineTimer = this.time.addEvent({
            delay: 250,
            callback: () => {
                this.blinkingLine.alpha = !this.blinkingLine.alpha;
            },
            loop: true
        });
    }

    create() {
        currScene = 'mailScene';
        this.background = this.add.sprite(centerX, centerY, 'computer');
        this.mailTitle = this.add.sprite(centerX - 7, centerY - 170, 'mail').setScale(5.15);

        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.createPauseButton();
        this.createBackButton();

        this.textYOffset = 140;
        let maxTextLength = 25;
        let maxLineLength = 10;
        let previousTextLength = [];
        // push 0 to previousTextLength maxLineLength times
        for (let i = 0; i < maxLineLength; i++) {
            previousTextLength.push(0);
        }
        this.characterLength = 0;
        let lineLength = 0;

        this.textEntry = this.add.text(250, this.textYOffset, '', { font: '32px Courier', fill: '#ffff00' });

        this.createBlinkingLine();

        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 13 && lineLength < maxLineLength - 1) {
                this.textEntry.text += '\n';
                previousTextLength[lineLength] = this.characterLength;
                this.characterLength = 0;
                lineLength++;
            }
            else if (event.keyCode === 8 && this.textEntry.text.length > 0)
            {
                this.characterLength--;
                if (this.characterLength < 0 && this.textEntry.text[this.textEntry.text.length - 1] == '\n') {
                    lineLength--;
                    this.characterLength = previousTextLength[lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
                }
                // if the current character is a newline character, remove the newline character and the previous character
                else if (this.characterLength <= 0 && this.textEntry.text[this.textEntry.text.length - 2] == '\n') {
                    previousTextLength[lineLength] = 0;
                    lineLength--;
                    this.characterLength = previousTextLength[lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 2);
                } else this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) || (event.keyCode >= 186 && event.keyCode < 192) || (event.keyCode >= 219 && event.keyCode < 223) && lineLength < maxLineLength)
            {
                // Press enter to go to next line
                if (this.characterLength == maxTextLength && this.characterLength > 0 && event.keyCode != 13) {
                    this.textEntry.text += '\n';
                    previousTextLength[lineLength] = this.characterLength;
                    this.characterLength = 0;
                    lineLength++;
                }
                if (lineLength < maxLineLength) {
                    this.textEntry.text += event.key;
                    this.characterLength++;
                }
            }
        });
    }

    update() {
        this.blinkingLine.x = this.lineXOffset + this.characterLength * 20;
        this.blinkingLine.y = this.lineYOffset + this.textEntry.height;
    }

}