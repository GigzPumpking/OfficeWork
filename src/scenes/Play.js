class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Add a camera 
        this.cameras.main.setBounds(0, 0, w, h + 40*rescale);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(centerX, centerY);
        playPan = false;

        // Flames Variables (Reset)
        this.flames = null;
        flamesScale = rescale/2;

        // Trash Variables (Reset)
        trashBurning = false;
        trashNum = 0;
        trashFilled = 0;

        // Cigarette Variables (Reset)
        cigsSmoked = 0;

        // Inventory Variables (Reset)
        inventory = [];

        // Mail Variables (Reset)
        mail1Status = false;
        mail2Status = false;
        mail3Status = false;
        mailStatus = [mail1Status, mail2Status, mail3Status];

        // Paper Sorting Variables (Reset)
        papersSorted = false;
        paperballStatus = 'paperball';

        // Time Variables (Reset)
        this.timeMins = 0;
        this.timeMS = 0;

        // Phone Timer (Reset)
        this.randomPhoneTimer = Math.floor(Math.random() * 500) + 100;
        this.randomPhoneCooldown = this.randomPhoneTimer;

        // Play Music
        ambient.play();

        // Current and Previous Scene
        currScene = 'playScene';
        prevScene = 'endDayScene';

        // Create Office
        this.officeCreation();

        // Create Pause and Inventory Buttons
        createPauseButton(this);
        createInventoryButton(this);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    update() {
        // Press P to pause
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }

        updateCurrPrev('playScene', 'endDayScene');

        timeUpdate(this);

        this.coworker.update();

        this.trashUpdate();

        this.taskCheck();

        this.phoneCalls();

        this.ashtray.setTexture('ashtray' + cigsSmoked);
    }

    trashUpdate() {
        this.trashcan.setTexture('Basket' + trashNum);
        if (trashNum == trashNumMax) {
            this.trashcan.x = centerX + 19.75*rescale;
            this.trashcan.y = centerYP + 57.7*rescale;
        }
        if (trashBurning) {
            if (this.flames == null) {
                console.log('flames');
                this.flames = this.add.sprite(this.trashcan.x, this.trashcan.y, 'fireBasketIdle').setScale(rescale).setDepth(4);
                this.flames.anims.play('fireBasketIdleP');
            }
            else {
                this.flames.setScale(flamesScale*1.2);
            }
        }
    }

    phoneCalls() {
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

    taskCheck() {
        mailStatus = [mail1Status, mail2Status, mail3Status];

        // if all items in mailStatus array is true, quickly fade out toDoTaskText1
        if (mailStatus.every((val, i, arr) => val === true)) {
            if (this.toDoTaskText1.alpha > 0) this.toDoTaskText1.alpha -= 0.01;
            else this.toDoTaskText1.alpha = 0;
        } else {
            if (this.toDoTaskText1.alpha < 1) this.toDoTaskText1.alpha += 0.01;
            else this.toDoTaskText1.alpha = 1;
        }

        // if papersSorted is true, quickly fade out toDoTaskText2
        if (papersSorted) {
            if (this.toDoTaskText2.alpha > 0) this.toDoTaskText2.alpha -= 0.01;
            else this.toDoTaskText2.alpha = 0;
        } else {
            if (this.toDoTaskText2.alpha < 1) this.toDoTaskText2.alpha += 0.01;
            else this.toDoTaskText2.alpha = 1;
        }
    }

    officeCreation() {
        this.background = this.add.sprite(centerX, centerYP, 'officeBG').setScale(rescale).setDepth(-1);

        this.coworker = new Coworker(this, 0, centerYP - 35*rescale, 'Silhouette', 0, 1).setScale(rescale).setDepth(0);

        this.cubicles = this.add.sprite(centerX, centerYP, 'cubicles').setScale(rescale).setDepth(1);

        this.desk = this.add.sprite(centerX - 12.5*rescale, centerYP, 'desk').setScale(rescale).setDepth(2);

        this.drawer = new ButtonCreation(this, centerX - 48.5*rescale, centerYP + 37.5*rescale, 'drawer1', rescale, () => {
            if (playPan) {
                if (!this.drawer.drawerOpen) {
                this.drawer.drawerOpen = true;
                this.drawer.drawerOn();
                } else {
                    this.drawer.drawerOpen = false;
                    this.drawer.drawerOut();
                }
            }
        }).setDepth(3);
        this.drawer.isDrawer = true;

        this.cigbox = new ButtonCreation(this, this.drawer.x + rescale, this.drawer.y - 2*rescale, 'cigbox', rescale, () => {
            inventory.push('cigbox');
            this.cigbox.alpha = 0;
        }).setDepth(4).setAlpha(0);

        this.lighter = new ButtonCreation(this, this.drawer.x + 13*rescale, this.drawer.y - 2*rescale, 'lighter', rescale, () => {
            inventory.push('lighter');
            this.lighter.alpha = 0;
        }).setDepth(4).setAlpha(0);

        this.clock = this.add.sprite(centerX + 4*rescale, centerYP + 6*rescale, 'clock').setScale(rescale).setDepth(3);

        this.timeLeftUI = this.add.sprite(this.clock.x, this.clock.y - rescale, 'time').setOrigin(0.5, 0).setScale(0.9*rescale).setDepth(3.5);

        this.keyboard = this.add.sprite(centerX + 19*rescale, centerYP + 14*rescale, 'keyboard').setScale(rescale).setDepth(3);

        this.computer = new ButtonCreation(this, centerX + 47.5*rescale, centerYP + 2*rescale, 'computer', rescale, () => {
            this.scene.pause().launch('computerScene');
        }).setDepth(3.5);

        this.ashtray = this.add.sprite(centerX - 15*rescale, centerYP + 15*rescale, 'ashtray0').setScale(rescale).setDepth(3);

        this.todoBoard = this.add.sprite(centerX - 45*rescale, centerYP - 17.5*rescale, 'todoBoard').setScale(rescale).setDepth(3);

        this.toDoTaskText1 = this.add.sprite(this.todoBoard.x - 0.5*rescale, this.todoBoard.y, "emailTask").setScale(rescale).setDepth(3.5);
        this.toDoTaskText2 = this.add.sprite(this.todoBoard.x + rescale, this.todoBoard.y + 7.5*rescale, "paperTask").setScale(rescale).setDepth(3.5);

        this.toDoTasks = [this.toDoTaskText1, this.toDoTaskText2];

        this.paperTrays = new ButtonCreation(this, centerX - 50*rescale, centerYP + 7.5*rescale, 'deskTrays', rescale, () => {
            this.scene.pause().launch('paperSortingGameScene');
        }).setDepth(3);

        this.trashcan = new ButtonCreation(this, centerX + 25*rescale, centerYP + 60*rescale, 'Basket0', rescale/1.5, () => {
            this.scene.pause().launch('trashCanScene');
        }).setDepth(3);

        // add button to move camera down
        this.downButton = new ButtonCreation(this, 50, centerYP + 5*rescale, 'downButton', 1, () => {
            this.cameras.main.pan(centerX, centerY + 200*rescale, 1000, 'Power2');
            playPan = true;
        }).setDepth(3);

        // add button to move camera up
        this.upButton = new ButtonCreation(this, 50, centerYP, 'upButton', 1, () => {
            this.cameras.main.pan(centerX, centerY, 750, 'Quadratic');
            playPan = false;
        }).setDepth(3);

        this.office = [this.background, this.coworker, this.cubicles, this.desk, this.drawer, this.cigbox, this.lighter, this.clock, this.timeLeftUI, this.keyboard, this.computer, this.ashtray, this.todoBoard, this.toDoTaskText1, this.toDoTaskText2, this.paperTrays, this.trashcan, this.downButton, this.upButton];
    }

}