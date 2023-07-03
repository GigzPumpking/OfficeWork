class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {

        let mainText = this.add.text(centerX, centerY - 200, 'Pause Menu', pauseConfig).setOrigin(0.5);

        let Resume = new Button(centerX, centerY - 100, 'Resume', this, () => {
            this.scene.resume(currScene).stop();
        })
        Resume.button.setFontSize(30);
        Resume.whiteButton();

        let Restart = new Button(centerX, centerY, 'Restart', this, () => {
            this.scene.resume(currScene).stop();
            var sceneRestart = this.scene.get(currScene);
            sceneRestart.scene.restart();
        })
        Restart.button.setFontSize(30);
        Restart.whiteButton();

        let MainMenu = new Button(centerX, centerY + 100, 'Main Menu', this, () => {
            this.scene.stop(currScene);
            if (currScene == 'mailScene') this.scene.stop('computerScene');
            if (currScene != 'playScene') this.scene.stop('playScene');
            this.scene.start('titleScene');
        })
        MainMenu.button.setFontSize(30);
        MainMenu.whiteButton();
    }

    update() {

    }
    
}
