class Mail extends Phaser.Scene {
    constructor() {
        super('mailScene');
    }
        
    createPauseButton() {
        this.pauseButton = new Button(40, 25, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
        this.pauseButton.button.setBackgroundColor('#000000');
    }

    createBackButton() {
        this.backButton = new Button(w - 40, 25, 'Back', this, () => {
            this.scene.stop('mailScene');
            this.scene.resume('computerScene');
        });
        this.backButton.button.setFontSize(24);
        this.backButton.whiteButton();
        this.backButton.button.setBackgroundColor('#000000');
    }

    createBlinkingLine() {
        this.lineXOffset = 245;
        this.lineYOffset = this.textYOffset - 30;
        this.blinkingLine = this.add.text(this.lineXOffset, this.lineYOffset, '|', { font: '26px Courier', fill: '#ffff00' });
        this.blinkingLine.alpha = 0;
        this.blinkingLineTimer = this.time.addEvent({
            delay: 250,
            callback: () => {
                this.blinkingLine.alpha = !this.blinkingLine.alpha;
            },
            loop: true
        });
    }

    loadPreviousMail() {
        this.loadMailButton = new Button(centerX - 80, centerY + 250, 'Load', this, () => {
            if (mailNum == 1) {
                this.textEntry.text = savedMail1;
                this.characterLength = savedMail1Stats[0];
                this.lineLength = savedMail1Stats[1];
                this.textLengthArray = savedMail1Stats[2];
                this.wordCount = savedMail1Stats[3];
            } else if (mailNum == 2) {
                this.textEntry.text = savedMail2;
                this.characterLength = savedMail2Stats[0];
                this.lineLength = savedMail2Stats[1];
                this.textLengthArray = savedMail2Stats[2];
                this.wordCount = savedMail2Stats[3];
            } else if (mailNum == 3) {
                this.textEntry.text = savedMail3;
                this.characterLength = savedMail3Stats[0];
                this.lineLength = savedMail3Stats[1];
                this.textLengthArray = savedMail3Stats[2];
                this.wordCount = savedMail3Stats[3];
            }
        });
        this.loadMailButton.button.setFontSize(30);
        this.loadMailButton.whiteButton();
    }

    saveCurrentMail() {
        this.saveMailButton = new Button(centerX + 70, centerY + 250, 'Save', this, () => {
            if (mailNum == 1) {
                savedMail1 = this.textEntry.text;
                savedMail1Stats = [this.characterLength, this.lineLength, this.textLengthArray, this.wordCount];
            }
            else if (mailNum == 2) {
                savedMail2 = this.textEntry.text;
                savedMail2Stats = [this.characterLength, this.lineLength, this.textLengthArray, this.wordCount];
            }
            else if (mailNum == 3) {
                savedMail3 = this.textEntry.text;
                savedMail3Stats = [this.characterLength, this.lineLength, this.textLengthArray, this.wordCount];
            }
        });
        this.saveMailButton.button.setFontSize(30);
        this.saveMailButton.whiteButton();
    }

    sendMail() {
        this.sendMailButton = new Button(centerX + 140, centerY + 185, 'Send', this, () => {
            this.mailStatusUpdate();
        });
        this.sendMailButton.button.setFontSize(30);
    }

    create() {
        this.wordCount = 0;
        currScene = 'mailScene';
        this.background = this.add.sprite(centerX, centerY, 'computerBG');
        this.mailTitle = this.add.sprite(centerX, centerY - 1, 'mail').setScale(5.15);
        if (mailNum == 1) {
            this.mailPrompt = this.add.text(centerX - 220, centerY - 140, "It's your boss.\nConvince me on why you should get a raise.", { font: '16px Courier', fill: '#ffffff', align: 'center' });
        } else if (mailNum == 2) {
            this.mailPrompt = this.add.text(centerX - 165, centerY - 140, "Hey, it's your coworker!\nHave you done the paper sorting?", { font: '16px Courier', fill: '#ffffff', align: 'center' });
        } else if (mailNum == 3) {
            this.mailPrompt = this.add.text(centerX - 240, centerY - 135, "I sent cupcakes to the office for your birthday.\nTell me if you like them!", { font: '16px Courier', fill: '#ffffff', align: 'center' });
        }

        // Scale background to fit screen
        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;

        this.createPauseButton();
        this.createBackButton();
        this.loadPreviousMail();
        this.saveCurrentMail();
        this.sendMail();

        this.textYOffset = 180;
        let maxTextLength = 25;
        let maxLineLength = 8;
        this.textLengthArray = [];
        // push 0 to this.textLengthArray maxLineLength times
        for (let i = 0; i < maxLineLength; i++) {
            this.textLengthArray.push(0);
        }
        this.characterLength = 0;
        this.lineLength = 0;

        this.textEntry = this.add.text(250, this.textYOffset, '', { font: '32px Courier', fill: '#ffff00' });

        this.createBlinkingLine();

        // Handle keyboard input

        // Use invisible input element and focus() to get mobile keyboard to show
        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute('type', 'text');
        this.inputElement.setAttribute('id', 'inputElement');
        this.inputElement.setAttribute('style', 'position: absolute; top: 0; left: 0; opacity: 0; z-index: -1;');
        document.body.appendChild(this.inputElement);
        this.inputElement.focus();

        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 13 && this.lineLength < maxLineLength - 1) {
                this.textEntry.text += '\n';
                this.textLengthArray[this.lineLength] = this.characterLength;
                this.characterLength = 0;
                this.lineLength++;
            }
            else if (event.keyCode === 8 && this.textEntry.text.length > 0)
            {
                this.characterLength--;
                this.wordCount--;
                if (this.characterLength < 0 && this.textEntry.text[this.textEntry.text.length - 1] == '\n') {
                    this.lineLength--;
                    this.characterLength = this.textLengthArray[this.lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
                }
                // if the current character is a newline character, remove the newline character and the previous character
                else if (this.characterLength <= 0 && this.textEntry.text[this.textEntry.text.length - 2] == '\n') {
                    this.textLengthArray[this.lineLength] = 0;
                    this.lineLength--;
                    this.characterLength = this.textLengthArray[this.lineLength];
                    this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 2);
                } else this.textEntry.text = this.textEntry.text.slice(0, this.textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) || (event.keyCode >= 186 && event.keyCode < 192) || (event.keyCode >= 219 && event.keyCode < 223) && this.lineLength < maxLineLength)
            {
                // Press enter to go to next line
                if (this.characterLength == maxTextLength && this.characterLength > 0 && event.keyCode != 13) {
                    this.textEntry.text += '\n';
                    this.textLengthArray[this.lineLength] = this.characterLength;
                    this.characterLength = 0;
                    this.lineLength++;
                }
                if (this.lineLength < maxLineLength) {
                    this.textEntry.text += event.key;
                    this.characterLength++;
                    this.wordCount++;
                }
            }
        });
    }

    mailStatusUpdate() {
        if (mailNum == 1) {
            if (this.wordCount >= mail1WCReq) {
                mail1Status = true;
            }
        }
        else if (mailNum == 2) {
            if (this.wordCount >= mail2WCReq) {
                mail2Status = true;
            }
        }
        else if (mailNum == 3) {
            if (this.wordCount >= mail3WCReq) {
                mail3Status = true;
            }
        }
    }

    mailStatusCheck() {
        if (mailNum == 1) {
            if (this.wordCount >= mail1WCReq) {
                return true;
            } else return false;
        }
        else if (mailNum == 2) {
            if (this.wordCount >= mail2WCReq) {
                return true;
            } else return false;
        }
        else if (mailNum == 3) {
            if (this.wordCount >= mail3WCReq) {
                return true;
            } else return false;
        }
    }

    update() {
        this.blinkingLine.x = this.lineXOffset + this.characterLength * 20;
        this.blinkingLine.y = this.lineYOffset + this.textEntry.height;
        
        if (this.mailStatusCheck()) {
            if (this.sendMailButton.status != 'green') this.sendMailButton.greenButton();
        } else if (this.sendMailButton.status != 'red') this.sendMailButton.redButton();
    }

}