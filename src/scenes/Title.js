class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        currScene = 'titleScene';

        let buttonScale = 0.8;

        this.background = this.add.sprite(centerX, centerYP, 'officeBG').setScale(rescale).setDepth(-1);

        this.coworker = new Coworker(this, 0, centerYP - 35*rescale, 'Silhouette', 0, 1).setScale(rescale).setDepth(0);

        this.cubicles = this.add.sprite(centerX, centerYP, 'cubicles').setScale(rescale).setDepth(1);

        this.desk = this.add.sprite(centerX - 12.5*rescale, centerYP, 'desk').setScale(rescale).setDepth(2);

        this.drawer = this.add.sprite(centerX - 48.5*rescale, centerYP + 37.5*rescale, 'drawer1').setScale(rescale).setDepth(3);

        this.clock = this.add.sprite(centerX + 4*rescale, centerYP + 6*rescale, 'clock').setScale(rescale).setDepth(3);

        this.timeLeftUI = this.add.sprite(this.clock.x, this.clock.y - rescale, 'time').setOrigin(0.5, 0).setScale(0.9*rescale).setDepth(3.5);

        this.keyboard = this.add.sprite(centerX + 19*rescale, centerYP + 14*rescale, 'keyboard').setScale(rescale).setDepth(3);

        this.computer = this.add.sprite(centerX + 47.5*rescale, centerYP + 2*rescale, 'computer').setScale(rescale).setDepth(3.5);

        this.ashtray = this.add.sprite(centerX - 15*rescale, centerYP + 15*rescale, 'ashtray0').setScale(rescale).setDepth(3);

        this.todoBoard = this.add.sprite(centerX - 45*rescale, centerYP - 17.5*rescale, 'todoBoard').setScale(rescale).setDepth(3);

        this.toDoTaskText1 = this.add.sprite(this.todoBoard.x - 0.5*rescale, this.todoBoard.y, "emailTask").setScale(rescale).setDepth(3.5);
        
        this.toDoTaskText2 = this.add.sprite(this.todoBoard.x + rescale, this.todoBoard.y + 7.5*rescale, "paperTask").setScale(rescale).setDepth(3.5);

        this.paperTrays = this.add.sprite(centerX - 50*rescale, centerYP + 7.5*rescale, 'deskTrays').setScale(rescale).setDepth(3);

        this.office = [this.background, this.coworker, this.cubicles, this.desk, this.drawer, this.cigbox, this.lighter, this.clock, this.timeLeftUI, this.keyboard, this.computer, this.ashtray, this.todoBoard, this.toDoTaskText1, this.toDoTaskText2, this.paperTrays, this.trashcan, this.downButton, this.upButton];

        dimBG(this, 0.6);
        this.dimBG.setDepth(5);

        this.title = this.add.sprite(centerX, centerY - 25*buttonScale*rescale, 'TITLE').setScale(buttonScale*rescale).setDepth(6);
        jiggle(this, this.title);

        this.creditsButton = new ButtonCreation(this, centerX - 50*buttonScale*rescale, centerY + 35*buttonScale*rescale, 'CREDITS', buttonScale*rescale/1.5, () => {
            // Pause scene and launch credits scene
            this.sound.play('buttonPress', {volume: sfxAudio});
            this.scene.pause().launch('creditScene');
        }).setDepth(6);

        this.optionsButton = new ButtonCreation(this, centerX + 50*buttonScale*rescale, centerY + 35*buttonScale*rescale, 'OPTIONS', buttonScale*rescale/1.5, () => {
            // insert Options Menu here
            this.sound.play('buttonPress', {volume: sfxAudio});
            this.scene.pause().launch('pauseScene');
        }).setDepth(6);

        this.startButton = new ButtonCreation(this, centerX, centerY + 18*buttonScale*rescale, 'START', buttonScale*rescale/1.25, () => {
            this.sound.play('buttonPress', {volume: sfxAudio});
            titleAmbient.stop();
            this.scene.start('endDayScene');
        }).setDepth(6);

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        this.sound.stopAll();

        titleAmbient.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) 
            this.scene.pause().launch('creditScene');
    }
}