class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        currScene = 'titleScene';

        let buttonScale = 0.8;

        let backgroundAlpha = 0.5;

        this.office = [];

        this.background = this.add.sprite(centerX, centerY, 'officeBG');

        // Store the original width and height of the background
        this.background.originalWidth = this.background.width;
        this.background.originalHeight = this.background.height;

        this.background.displayWidth = game.config.width;
        this.background.displayHeight = game.config.height;
        this.backgroundNewScale = this.background.scale;
        this.office.push(this.background);

        // Store the amount of increase in width and height
        this.backgroundWidthIncrease = this.background.displayWidth / this.background.originalWidth;
        this.backgroundHeightIncrease = this.background.displayHeight / this.background.originalHeight;

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

        this.paperStack = this.add.sprite(centerX - 225, centerY + 50, 'paperStackA');
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
            else if (element == this.paperStack) {
                element.scale = this.backgroundNewScale/2;
                element.ogScale = element.scale;
            }
            else if (element != this.background) {
                element.displayWidth *= this.backgroundWidthIncrease;
                element.displayHeight *= this.backgroundHeightIncrease;
            }
        });

        this.add.rectangle(centerX, centerY, game.config.width, game.config.height, 0x000000, 0.5).setOrigin(0.5);

        this.add.sprite(centerX, centerY - 50*buttonScale, 'titleText').setScale(buttonScale/1.5);

        this.creditsButton = new ButtonCreation(this, centerX - 250*buttonScale, centerY, 'creditsButton', buttonScale, () => {
            this.scene.start('creditScene');
        });

        this.howtoButton = new ButtonCreation(this, centerX + 75*buttonScale, centerY + 137.5*buttonScale, 'tutorialButton', buttonScale, () => {
            this.scene.start('howtoScene');
        });

        this.optionsButton = new ButtonCreation(this, centerX - 250*buttonScale, centerY + 87.5*buttonScale, 'optionsButton', buttonScale, () => {
            // insert Options Menu here
        });

        this.startButton = new ButtonCreation(this, centerX + 75*buttonScale, centerY + 18.75*buttonScale, 'startButton', buttonScale, () => {
            this.scene.start('playScene');
        });

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        this.sound.stopAll();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) 
            this.scene.start('creditScene');    
        
        if (Phaser.Input.Keyboard.JustDown(keyH)) 
           this.scene.start('howtoScene');    
    }
}