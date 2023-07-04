class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.flames = null;
        flamesScale = 2.8;
        trashBurning = false;
        inventory = [];
        trashNum = 0;
        trashFilled = 0;
        cigsSmoked = 0;
        papersSorted = false;
        mail1Status = false;
        mail2Status = false;
        mail3Status = false;
        paperballStatus = 'paperball';
        mailStatus = [mail1Status, mail2Status, mail3Status];

        ambient.play();

        currScene = 'playScene';
        prevScene = 'endDayScene';

        this.officeCreation();

        this.toDoTaskText1 = this.add.text(centerX - 265, centerY - 110, "Sort Papers", {fontFamily: 'Courier', fontSize: '16px', color: '#000000', align: 'center'});
        this.toDoTaskText2 = this.add.text(centerX - 265, centerY - 80, "Send Emails", {fontFamily: 'Courier', fontSize: '16px', color: '#000000', align: 'center'});

        this.toDoTasks = [this.toDoTaskText1, this.toDoTaskText2];

        createPauseButton(this);
        createInventoryButton(this);

        // Day Timer stuff

        this.timeMins = 9;
        this.ampm = 'AM';
        this.timeMS = 0;
        this.timeLeftUI = this.add.text(5, 100, this.timeMins + " " + this.ampm, timerConfig);

        this.randomPhoneTimer = Math.floor(Math.random() * 500) + 100;
        this.randomPhoneCooldown = this.randomPhoneTimer;

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        // Day Timer Stuff
        this.timeMS++;
        //console.log(this.timeMS);
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

        updateCurrPrev('playScene', 'endDayScene');

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
        this.trashcan.setTexture('Basket' + trashNum);
        if (trashNum == trashNumMax) {
            this.trashcan.x = centerX + 236;
            this.trashcan.y = centerY + 215;
        }
        if (trashBurning) {
            if (this.flames == null) {
                this.flames = this.add.sprite(centerX + 260, centerY + 215, 'fireBasketIdle');
                this.flames.anims.play('fireBasketIdle');
            }
            else {
                this.flames.setScale(flamesScale*0.8);
            }
        }

        this.ashtray.setTexture('ashtray' + cigsSmoked);

        // Play a random phone at a random interval

        if (this.randomPhoneCooldown < 0) {
            // Random number from 1 to 4
            let rand = Math.floor(Math.random() * 4) + 1;
            this.sound.play('phones' + rand, { volume: sfxAudio, loop: false });
            this.randomPhoneTimer = Math.floor(Math.random() * 1000) + 500;
            this.randomPhoneCooldown = this.randomPhoneTimer;
        } else 
            this.randomPhoneCooldown--;
    }

    officeCreation() {
        this.office = [];

        this.background = this.add.sprite(centerX, centerY, 'officeBG');

        // Store the original width and height of the background
        this.background.originalWidth = this.background.width;
        this.background.originalHeight = this.background.height;

        this.background.displayWidth = w;
        this.background.displayHeight = h;
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

        this.drawer = new ButtonCreation(this, centerX - 187.5, centerY + 140, 'drawer1', 1, () => {
            if (!this.drawer.drawerOpen) {
                this.drawer.drawerOpen = true;
                this.drawer.drawerOn();
            } else {
                this.drawer.drawerOpen = false;
                this.drawer.drawerOut();
            }
        });
        this.drawer.isDrawer = true;
        this.office.push(this.drawer);

        // Create cigLighter button
        this.cigLighter = new ButtonCreation(this, this.drawer.x + 20, this.drawer.y - 16, 'cigbox', this.backgroundNewScale, () => {
            // if inventory includes lighter, initiate cigarette
            inventory.push('cigbox');
            this.cigLighter.alpha = 0;
        });

        // Create Lighter button
        this.lighter = new ButtonCreation(this, this.drawer.x + 70, this.drawer.y - 14.5, 'lighter', this.backgroundNewScale, () => {
            inventory.push('lighter');
            this.lighter.alpha = 0;
        });

        // Hide cigLighter and Lighter button
        this.cigLighter.alpha = 0;
        this.lighter.alpha = 0;

        this.keyboard = this.add.sprite(centerX + 120, centerY + 50, 'keyboard');
        this.office.push(this.keyboard);

        //this.computer = this.add.sprite(centerX + 500, centerY - 75, 'computer');
        this.computer = new ButtonCreation(this, centerX + 300, centerY + 5, 'computer', 1, () => {
            this.scene.pause().launch('computerScene');
        });
        this.office.push(this.computer);

        this.ashtray = this.add.sprite(centerX + 100, centerY - 80, 'ashtray0');
        this.office.push(this.ashtray);

        this.todoBoard = this.add.sprite(centerX, centerY - 80, 'todoBoard');
        this.office.push(this.todoBoard);

        this.paperStack = new ButtonCreation(this, centerX - 225, centerY + 50, 'deskTrays', 1, () => {
            this.scene.pause().launch('paperSortingGameScene');
        });
        this.office.push(this.paperStack);

        // Create trashcan button
        trashNum = 0;
        this.trashcan = new ButtonCreation(this, centerX + 260, centerY + 225, 'Basket0', 1, () => {
            this.scene.pause().launch('trashCanScene');
        });
        this.office.push(this.trashcan);

        this.office.forEach(element => {
            if (element == this.trashcan) {
                element.scale = this.backgroundNewScale/2;
                element.ogScale = element.scale;
            }
            else if (element == this.computer || element == this.paperStack) {
                element.scale = this.backgroundNewScale;
                element.ogScale = element.scale;
            } 
            else if (element == this.coworker) {
                element.scale = this.backgroundNewScale/1.25;
                element.ogScale = element.scale;
            }
            else if (element == this.drawer) {
                element.displayWidth *= this.backgroundWidthIncrease;
                element.displayHeight *= this.backgroundHeightIncrease;
                element.ogScale = element.scale;
            }
            else if (element != this.background) {
                element.displayWidth *= this.backgroundWidthIncrease;
                element.displayHeight *= this.backgroundHeightIncrease;
            }
        });
    }

}