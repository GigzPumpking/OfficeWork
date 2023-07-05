class Mail extends Phaser.Scene {
    constructor() {
        super('mailScene');
    }

    createBlinkingLine() {
        this.lineXOffset = 55*rescale;
        this.lineYOffset = this.textYOffset - 6*rescale;
        this.blinkingLine = this.add.text(this.lineXOffset, this.lineYOffset, '|', { font: 'Courier', fill: '#ffff00' }).setFontSize(5.2*rescale);
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
        this.loadMailButton = new Button(centerX - 20*rescale, centerY + 47.5*rescale, 'Load', this, textConfig, () => {
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
        this.loadMailButton.button.setFontSize(5*rescale);
        this.loadMailButton.whiteButton();
    }

    saveCurrentMail() {
        this.saveMailButton = new Button(centerX + 18*rescale, centerY + 47.5*rescale, 'Save', this, textConfig, () => {
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
        this.saveMailButton.button.setFontSize(5*rescale);
        this.saveMailButton.whiteButton();
    }

    sendMail() {
        this.sendMailButton = new Button(centerX + 28*rescale, centerY + 37*rescale, 'Send', this, textConfig, () => {
            this.mailStatusUpdate();
        });
        this.sendMailButton.button.setFontSize(6*rescale);
    }

    create() {
        this.widthIncrease = 3.2*rescale;
        this.wordCount = 0;
        currScene = 'mailScene';
        prevScene = 'computerScene';
        this.background = this.add.sprite(centerX, centerY, 'computerBG').setScale(rescale);
        this.mailTitle = this.add.sprite(centerX, centerY - rescale, 'mail').setScale(rescale);
        if (mailNum == 1) {
            this.mailPrompt = this.add.text(centerX - 44*rescale, centerY - 28*rescale, "It's your boss.\nConvince me on why you should get a raise.", { font: 'Courier', fill: '#ffffff', align: 'center' }).setFontSize(3.2*rescale);
        } else if (mailNum == 2) {
            this.mailPrompt = this.add.text(centerX - 33*rescale, centerY - 28*rescale, "Hey, it's your coworker!\nHave you done the paper sorting?", { font: 'Courier', fill: '#ffffff', align: 'center' }).setFontSize(3.2*rescale);
        } else if (mailNum == 3) {
            this.mailPrompt = this.add.text(centerX - 48*rescale, centerY - 26*rescale, "I sent cupcakes to the office for your birthday.\nTell me if you like them!", { font: 'Courier', fill: '#ffffff', align: 'center' }).setFontSize(3.2*rescale);
        }

        createPauseButton(this);
        createInventoryButton(this);
        createBackButton(this, currScene, prevScene);
        this.loadPreviousMail();
        this.saveCurrentMail();
        this.sendMail();

        this.textYOffset = 36*rescale;
        let maxTextLength = 22;
        let maxLineLength = 7;
        this.textLengthArray = [];
        // push 0 to this.textLengthArray maxLineLength times
        for (let i = 0; i < maxLineLength; i++) {
            this.textLengthArray.push(0);
        }
        this.characterLength = 0;
        this.lineLength = 0;

        this.textEntry = this.add.text(52*rescale, this.textYOffset, '', { font: 'Courier', fill: '#ffff00' }).setFontSize(6.4*rescale);

        this.createBlinkingLine();

        // On key press, play random keyboard sound
        this.input.keyboard.on('keydown', event => {
            let rand = Math.floor(Math.random() * 4) + 1;
            this.sound.play('keyClack' + rand, { volume: sfxAudio, loop: false });
        });

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
        timeUpdate(this);
        updateCurrPrev('mailScene', 'computerScene');
        
        this.blinkingLine.x = this.lineXOffset + this.characterLength * this.widthIncrease;
        this.widthIncrease = 3.2*rescale + this.characterLength*(rescale)*0.025;
        this.blinkingLine.y = this.lineYOffset + this.textEntry.height;
        
        if (this.mailStatusCheck()) {
            if (this.sendMailButton.status != 'green') this.sendMailButton.greenButton();
        } else if (this.sendMailButton.status != 'red') this.sendMailButton.redButton();
    }

}