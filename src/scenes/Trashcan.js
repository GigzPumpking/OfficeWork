class Trashcan extends Phaser.Scene {
    constructor() {
        super('trashCanScene');
    }


    create() {
        currScene = 'trashCanScene';
        prevScene = 'playScene';

        createPauseButton(this);
        createBackButton(this, currScene, prevScene);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        updateCurrPrev('trashCanScene', 'playScene');

        // if P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.pause().launch('pauseScene');
        }
    }
}