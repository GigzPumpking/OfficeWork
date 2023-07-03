class Computer extends Phaser.Scene {
    constructor() {
        super('computerScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('computer', 'computer/computer_background.png');
        //this.load.spritesheet('font', 'computer/font.png', {frameWidth: 3, frameHeight: 3, startFrame: 0, endFrame: 31});
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
            this.scene.stop('computerScene');
            this.scene.resume('playScene');
        });
        this.backButton.button.setFontSize(30);
    }

    create() {
        let maxTextLength = 25;
        let maxLineLength = 10;
        let previousTextLength = [];
        // push 0 to previousTextLength maxLineLength times
        for (let i = 0; i < maxLineLength; i++) {
            previousTextLength.push(0);
        }
        let characterLength = 0;
        let lineLength = 0;
        currScene = 'computerScene';

        this.background = this.add.sprite(centerX, centerY, 'computer');
        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.createPauseButton();
        this.createBackButton();

        this.textEntry = this.add.text(250, 120, '', { font: '32px Courier', fill: '#ffff00' });

        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 13 && lineLength < maxLineLength - 1) {
                this.textEntry.text += '\n';
                previousTextLength[lineLength] = characterLength;
                characterLength = 0;
                lineLength++;
            }
            else if (event.keyCode === 8 && this.textEntry.text.length > 0)
            {
                characterLength--;
                if (characterLength < 0 && this.textEntry.text[this.textEntry.text.length - 1] == '\n') {
                    lineLength--;
                    characterLength = previousTextLength[lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
                }
                // if the current character is a newline character, remove the newline character and the previous character
                else if (characterLength <= 0 && this.textEntry.text[this.textEntry.text.length - 2] == '\n') {
                    previousTextLength[lineLength] = 0;
                    lineLength--;
                    characterLength = previousTextLength[lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 2);
                } else this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) || (event.keyCode >= 186 && event.keyCode < 192) || (event.keyCode >= 219 && event.keyCode < 223) && lineLength < maxLineLength)
            {
                // Press enter to go to next line
                if (characterLength == maxTextLength && characterLength > 0 && event.keyCode != 13) {
                    this.textEntry.text += '\n';
                    previousTextLength[lineLength] = characterLength;
                    characterLength = 0;
                    lineLength++;
                }
                if (lineLength < maxLineLength) {
                    this.textEntry.text += event.key;
                    characterLength++;
                }
            }
        });
    }

    update() {
    }

}