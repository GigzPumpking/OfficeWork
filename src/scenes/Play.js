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

        if (!trashBurning) timeUpdate(this);

        if (!trashBurning) this.coworker.update();

        this.trashUpdate();

        this.taskCheck();

        this.phoneCalls();

        this.ashtray.setTexture('ashtray' + cigsSmoked);

        // Make pause and inventory buttons follow camera
        this.pauseButton.y = this.cameras.main.scrollY + pauseY;

        this.inventoryButton.y = this.cameras.main.scrollY + inventoryY;

        this.downButton.y = this.cameras.main.scrollY + downY;

        this.upButton.y = this.cameras.main.scrollY + upY;
    }

    trashUpdate() {
        this.trashcan.setTexture('Basket' + trashNum);
        if (trashNum == trashNumMax) {
            this.trashcan.x = centerX + 19.75*rescale;
            this.trashcan.y = centerYP + 57.7*rescale;
        }
        if (trashBurning) {
            if (this.flames == null) {
                this.gameEnding();
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
            this.sound.play('phones' + rand, { volume: sfxAudio/2.5, loop: false });
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

    createFlames(x, y, scale, depth) {
        this.sound.play('fireStart', {volume: sfxAudio});
        return this.add.sprite(x, y, 'fireBasketIdle').setScale(scale).setDepth(depth);
    }

    gameEnding() {
        burningAmbient2.play();
        this.flames = this.add.sprite(this.trashcan.x, this.trashcan.y, 'fireBasketIdle').setScale(rescale).setDepth(4);
        this.flames.anims.play('fireBasketStartP');
        // once the animation is done, play the looping animation
        this.flames.on('animationcomplete', () => {
            this.flames.anims.play('fireBasketIdleP');
        });
        // wait 5 seconds, coworker looks up
        this.time.delayedCall(5000, () => {
            this.coworker.lookUpAction();
            // wait 1 seconds, coworker flips direction
            this.time.delayedCall(1000, () => {
                if (this.coworker.flipX == false) this.coworker.flipX = true;
                else this.coworker.flipX = false;
                // wait 2 seconds, coworker stares at you
                this.time.delayedCall(2000, () => {
                    this.coworker.stare();
                });
            });
            this.endFlames = this.add.sprite(centerX, h + 10*rescale, 'flamesSprite').setScale(rescale).setDepth(4);
            this.endFlames.anims.play('flamesSpriteAnims');
            // slowly rise the flames
            this.tweens.add({
                targets: this.endFlames,
                y: h - 10*rescale,
                duration: 5000,
                ease: 'Linear',
                repeat: 0,
                onComplete: () => {
                    this.flames2 = this.createFlames(this.paperTrays.x, this.paperTrays.y - 5*rescale, rescale/2, 4);
                    this.flames2.anims.play('fireBasketStartP');
                    // once the animation is done, play the looping animation
                    this.flames2.on('animationcomplete', () => {
                        this.flames2.anims.play('fireBasketIdleP');
                        this.flames3 = this.createFlames(this.ashtray.x, this.ashtray.y - 5*rescale, rescale/3, 4);
                        this.flames3.anims.play('fireBasketStartP');
                        // once the animation is done, play the looping animation
                        this.flames3.on('animationcomplete', () => {
                            this.flames3.anims.play('fireBasketIdleP');
                            this.flames4 = this.createFlames(this.computer.x, this.computer.y - 5*rescale, rescale/1.25, 4);
                            this.flames4.anims.play('fireBasketStartP');
                            // once the animation is done, play the looping animation
                            this.flames4.on('animationcomplete', () => {
                                this.flames4.anims.play('fireBasketIdleP');
                                // wait 2 seconds
                                this.sound.play('dialup', {volume: sfxAudio});
                                this.time.delayedCall(2000, () => {
                                    this.flames5 = this.createFlames(centerX, centerYP - 35*rescale, rescale, 0.5);
                                    this.flames5.anims.play('fireBasketStartP');
                                    // once the animation is done, play the looping animation
                                    this.flames5.on('animationcomplete', () => {
                                        this.flames5.anims.play('fireBasketIdleP');
                                        // add white rectangle to fade out
                                        this.whiteRect = this.add.rectangle(centerX, centerYP, w, h*(37/27), 0xffffff).setDepth(7);
                                        this.whiteRect.alpha = 0;
                                        // gradually increase the alpha of the white rectangle
                                        this.tweens.add({
                                            targets: this.whiteRect,
                                            alpha: { from: 0, to: 1 },
                                            duration: 5000,
                                            ease: 'Linear',
                                            repeat: 0,
                                            onComplete: () => {
                                                this.scene.start('endingScene');
                                            }
                                        }
                                        );
                                    });
                                });
                            });
                        });
                    });
                }
            });

            // gradually increase the volume of the burningAmbient2
            this.tweens.add({
                targets: burningAmbient2,
                volume: musicAudio*2.5,
                duration: 7000,
                ease: 'Linear',
                repeat: 0,
            });
        });
    }

    officeCreation() {
        this.background = this.add.sprite(centerX, centerYP, 'officeBG').setScale(rescale).setDepth(-1);

        this.coworker = new Coworker(this, 0, centerYP - 35*rescale, 'Silhouette', 0, 1).setScale(rescale).setDepth(0);

        this.cubicles = this.add.sprite(centerX, centerYP, 'cubicles').setScale(rescale).setDepth(1);

        this.desk = this.add.sprite(centerX - 12.5*rescale, centerYP, 'desk').setScale(rescale).setDepth(2);

        this.drawer = new ButtonCreation(this, centerX - 48.5*rescale, centerYP + 37.5*rescale, 'drawer1', rescale, () => {
            if (playPan) {
                if (!this.drawer.drawerOpen) {
                    this.sound.play('drawerOpen', { volume: sfxAudio });
                    this.drawer.drawerOpen = true;
                    this.drawer.drawerOn();
                } else {
                    this.sound.play('drawerClose', { volume: sfxAudio });
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
            if (!trashBurning) {
                this.scene.pause().launch('computerScene');
            } else this.sound.play('sendMailFail', { volume: sfxAudio });
        }).setDepth(3.5);

        this.ashtray = this.add.sprite(centerX - 15*rescale, centerYP + 15*rescale, 'ashtray0').setScale(rescale).setDepth(3);

        this.todoBoard = this.add.sprite(centerX - 45*rescale, centerYP - 17.5*rescale, 'todoBoard').setScale(rescale).setDepth(3);

        this.toDoTaskText1 = this.add.sprite(this.todoBoard.x - 0.5*rescale, this.todoBoard.y, "emailTask").setScale(rescale).setDepth(3.5);
        this.toDoTaskText2 = this.add.sprite(this.todoBoard.x + rescale, this.todoBoard.y + 7.5*rescale, "paperTask").setScale(rescale).setDepth(3.5);

        this.toDoTasks = [this.toDoTaskText1, this.toDoTaskText2];

        this.paperTrays = new ButtonCreation(this, centerX - 50*rescale, centerYP + 7.5*rescale, 'deskTrays', rescale, () => {
            if (!trashBurning && !papersSorted) {
                this.scene.pause().launch('paperSortingGameScene');
            } else this.sound.play('sendMailFail', { volume: sfxAudio });
        }).setDepth(3);

        this.trashcan = new ButtonCreation(this, centerX + 25*rescale, centerYP + 60*rescale, 'Basket0', rescale/1.5, () => {
            if (!trashBurning) {
                this.scene.pause().launch('trashCanScene');
            } else this.sound.play('sendMailFail', { volume: sfxAudio });
        }).setDepth(3);

        // add button to move camera down
        this.downButton = new ButtonCreation(this, w - 8.5*rescale, downY, 'downarrow', rescale, () => {
            if (!playPan) {
                this.cameras.main.pan(centerX, centerY + 200*rescale, 1000, 'Power2');
                // on pan complete, set playPan to true
                this.cameras.main.once('camerapancomplete', () => {
                    playPan = true;
                });
            }
        }).setDepth(3);

        // add button to move camera up
        this.upButton = new ButtonCreation(this, w - 8.5*rescale, upY, 'uparrow', rescale, () => {
            if (playPan) {
                this.cameras.main.pan(centerX, centerY, 750, 'Quadratic');
                // on pan complete, set playPan to false
                this.cameras.main.once('camerapancomplete', () => {
                    playPan = false;
                });
            }
        }).setDepth(3);

        this.office = [this.background, this.coworker, this.cubicles, this.desk, this.drawer, this.cigbox, this.lighter, this.clock, this.timeLeftUI, this.keyboard, this.computer, this.ashtray, this.todoBoard, this.toDoTaskText1, this.toDoTaskText2, this.paperTrays, this.trashcan, this.downButton, this.upButton];
    }

}