class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    createPauseButton() {
        this.pauseButton = new Button(40, 25, 'Pause', this, () => {
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);
        this.pauseButton.button.setBackgroundColor('#000000');

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    create() {
        papersSorted = false;
        mail1Status = false;
        mail2Status = false;
        mail3Status = false;
        mailStatus = [mail1Status, mail2Status, mail3Status];

        // Play and loop ambient music
        this.ambient = this.sound.add('ambient', { volume: 0.5, loop: true });
        this.ambient.play();

        currScene = 'playScene';

        let backgroundAlpha = 0.5;

        this.office = [];

        this.background = this.add.sprite(centerX, centerY, 'officeBG');

        // Store the original width and height of the background
        this.background.originalWidth = this.background.width;
        this.background.originalHeight = this.background.height;

        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;
        this.office.push(this.background);

        // Store the amount of increase in width and height
        this.backgroundWidthIncrease = this.background.displayWidth / this.background.originalWidth;
        this.backgroundHeightIncrease = this.background.displayHeight / this.background.originalHeight;
        this.backgroundNewScale = this.background.scale;

        this.coworker = new Coworker(this, 0, centerY - 130, 'Silhouette', 0, 1);
        this.office.push(this.coworker);

        this.cubicles = this.add.sprite(centerX, centerY, 'cubicles');
        this.office.push(this.cubicles);

        this.desk = this.add.sprite(centerX, centerY, 'desk');
        this.office.push(this.desk);

        this.drawer = this.add.sprite(centerX - 187.5, centerY + 140, 'drawer1');
        this.office.push(this.drawer);

        this.keyboard = this.add.sprite(centerX + 120, centerY + 50, 'keyboard');
        this.office.push(this.keyboard);

        //this.computer = this.add.sprite(centerX + 500, centerY - 75, 'computer');
        this.computer = new ButtonCreation(this, centerX + 300, centerY + 5, 'computer', 1, () => {
            this.scene.pause().launch('computerScene');
        });
        this.office.push(this.computer);

        this.ashtray = this.add.sprite(centerX + 75, centerY - 80, 'ashtray0');
        this.office.push(this.ashtray);

        this.todoBoard = this.add.sprite(centerX, centerY - 80, 'todoBoard');
        this.office.push(this.todoBoard);

        this.paperStack = new ButtonCreation(this, centerX - 225, centerY + 50, 'paperStackA', 1, () => {
            this.scene.pause().launch('paperSortingGameScene');
        });
        this.paperStack.flipX = true;
        this.office.push(this.paperStack);

        this.trashcan = this.add.sprite(centerX + 260, centerY + 225, 'Basket2');
        this.office.push(this.trashcan);

        this.office.forEach(element => {
            if (element == this.trashcan) {
                element.displayWidth *= this.backgroundWidthIncrease/2;
                element.displayHeight *= this.backgroundHeightIncrease/2; 
            }
            else if (element == this.computer) {
                element.scale = this.backgroundNewScale;
                element.ogScale = element.scale;
            } 
            else if (element == this.coworker) {
                element.scale = this.backgroundNewScale/1.25;
                element.ogScale = element.scale;
            }
            else if (element == this.paperStack) {
                element.scale = this.backgroundNewScale/2;
                element.ogScale = element.scale;
            }
            else if (element != this.background) {
                element.displayWidth *= this.backgroundWidthIncrease;
                element.displayHeight *= this.backgroundHeightIncrease;
            }
        });

        this.toDoTaskText1 = this.add.text(centerX - 265, centerY - 110, "Sort Papers", {fontFamily: 'Courier', fontSize: '16px', color: '#000000', align: 'center'});
        this.toDoTaskText2 = this.add.text(centerX - 265, centerY - 80, "Send Emails", {fontFamily: 'Courier', fontSize: '16px', color: '#000000', align: 'center'});

        this.toDoTasks = [this.toDoTaskText1, this.toDoTaskText2];

        this.createPauseButton();

        // Day Timer stuff

        let timerConfig = {
            fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'center',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }

        this.timeMins = 9;
        this.ampm = 'AM';
        this.timeMS = 0;
        this.timeLeftUI = this.add.text(5, 80, this.timeMins + " " + this.ampm, timerConfig);

    }

    update() {
        // Day Timer Stuff
        this.timeMS++;
        console.log(this.timeMS);
        if (this.timeMS >= 600) {
            this.timeMS = 0;
            if(this.timeMins == 11) {
                this.ampm = 'PM';
            }
            if(this.timeMins == 12) {
                this.timeMins = 0;
            }
            this.timeMins++;
            this.timeLeftUI.text = this.timeMins + " " + this.ampm;
        }
        if (this.timeMins == 5 && this.timeMS >= 300) {
            this.scene.start('endDayScene');                
        }
        if (currScene != 'playScene') currScene = 'playScene';

        // Press P to pause
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }

        // if papersSorted is true, quickly fade out toDoTaskText1
        if (papersSorted) {
            if (this.toDoTaskText1.alpha > 0) this.toDoTaskText1.alpha -= 0.01;
            else this.toDoTaskText1.alpha = 0;
        } else {
            if (this.toDoTaskText1.alpha < 1) this.toDoTaskText1.alpha += 0.01;
            else this.toDoTaskText1.alpha = 1;
        }

        mailStatus = [mail1Status, mail2Status, mail3Status];

        // if all items in mailStatus array is true, quickly fade out toDoTaskText2
        if (mailStatus.every((val, i, arr) => val === true)) {
            if (this.toDoTaskText2.alpha > 0) this.toDoTaskText2.alpha -= 0.01;
            else this.toDoTaskText2.alpha = 0;
        } else {
            if (this.toDoTaskText2.alpha < 1) this.toDoTaskText2.alpha += 0.01;
            else this.toDoTaskText2.alpha = 1;
        }

        this.coworker.update();
    }

}