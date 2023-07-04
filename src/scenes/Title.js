class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        currScene = 'titleScene';

        let buttonScale = 0.8;

        this.office = [];

        this.background = this.add.sprite(centerX, centerY, 'officeBG');

        // Store the original width and height of the background
        this.background.originalWidth = this.background.width;
        this.background.originalHeight = this.background.height;

        this.background.displayWidth = w;
        this.background.displayHeight = h;
        this.backgroundNewScale = this.background.scale;
        this.office.push(this.background);

        // Store the amount of increase in width and height
        this.backgroundWidthIncrease = this.background.displayWidth / this.background.originalWidth;
        this.backgroundHeightIncrease = this.background.displayHeight / this.background.originalHeight;

        this.coworker = new Coworker(this, 0, centerY - 130, 'Silhouette', 0, 1);
        this.office.push(this.coworker);

        this.cubicles = this.add.sprite(centerX, centerY, 'cubicles');
        this.office.push(this.cubicles);

        this.desk = this.add.sprite(centerX, centerY, 'desk');
        this.office.push(this.desk);

        this.drawer = this.add.sprite(centerX - 187.5, centerY + 140, 'drawer1');
        this.office.push(this.drawer);

        this.computer = this.add.sprite(centerX + 300, centerY + 5, 'computer');
        this.office.push(this.computer);

        this.keyboard = this.add.sprite(centerX + 120, centerY + 50, 'keyboard');
        this.office.push(this.keyboard);

        this.ashtray = this.add.sprite(centerX + 75, centerY - 80, 'ashtray0');
        this.office.push(this.ashtray);

        this.todoBoard = this.add.sprite(centerX, centerY - 80, 'todoBoard');
        this.office.push(this.todoBoard);

        this.paperStack = this.add.sprite(centerX - 225, centerY + 50, 'deskTrays');
        this.paperStack.flipX = true;
        this.office.push(this.paperStack);

        this.trashcan = this.add.sprite(centerX + 260, centerY + 225, 'Basket2');
        this.office.push(this.trashcan);

        this.office.forEach(element => {
            if (element == this.trashcan) {
                element.displayWidth *= this.backgroundWidthIncrease/2;
                element.displayHeight *= this.backgroundHeightIncrease/2; 
            }
            else if (element == this.coworker) {
                element.scale = this.backgroundNewScale/1.25;
                element.ogScale = element.scale;
            }
            else if (element == this.computer) {
                element.scale = this.backgroundNewScale;
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

        dimBG(this, 0.5);

        this.title = this.add.sprite(centerX, centerY - 180*buttonScale, 'TITLE').setScale(buttonScale*4.5);

        // Continuously deflate and inflate the title slightly

        this.tweens.add({
            targets: this.title,
            scaleX: buttonScale*4.5 - 0.1,
            scaleY: buttonScale*4.5 - 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // Continuously rotate the title left and right slightly between -1 and 1

        this.tweens.add({
            targets: this.title,
            angle: 1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.creditsButton = new ButtonCreation(this, centerX - 300*buttonScale, centerY + 150*buttonScale, 'CREDITS', buttonScale*4, () => {
            // Pause scene and launch credits scene
            this.scene.pause().launch('creditScene');
        });

        /*this.howtoButton = new ButtonCreation(this, centerX + 75*buttonScale, centerY + 137.5*buttonScale, 'tutorialButton', buttonScale, () => {
            this.scene.start('howtoScene');
        });*/

        this.optionsButton = new ButtonCreation(this, centerX + 300*buttonScale, centerY + 150*buttonScale, 'OPTIONS', buttonScale*4, () => {
            // insert Options Menu here
            this.scene.pause().launch('pauseScene');
        });

        this.startButton = new ButtonCreation(this, centerX, centerY + 60*buttonScale, 'START', buttonScale*5, () => {
            this.scene.start('endDayScene');
        });

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        this.sound.stopAll();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) 
            this.scene.pause().launch('creditScene');
    }
}