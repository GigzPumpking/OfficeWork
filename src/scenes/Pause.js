class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {
        this.playScene = this.scene.get('playScene');
        // Pause ambient music
        this.playScene.ambient.pause();

        // Add a rectangle with alpha 0.5 to create a dark background for the pause menu
        this.add.rectangle(centerX, centerY, game.config.width, game.config.height, 0x000000, 0.5).setOrigin(0.5);
        // Add a white rectangle to the pause menu
        this.add.rectangle(centerX, centerY, game.config.width * 0.25, game.config.height * 0.55, 0xFFFFFF).setOrigin(0.5);
        let mainText = this.add.text(centerX, centerY - 200, 'Pause Menu', pauseConfig).setOrigin(0.5);

        let Resume = new Button(centerX, centerY - 100, 'Resume', this, () => {
            // Resume ambient music
            this.playScene.ambient.resume();
            this.scene.resume(currScene).stop();
        })
        Resume.button.setFontSize(30);
        Resume.blackButton();

        let Restart = new Button(centerX, centerY, 'Restart', this, () => {
            // Stop ambient music
            this.playScene.ambient.stop();
            this.scene.resume(currScene).stop();
            var sceneRestart = this.scene.get(currScene);
            sceneRestart.scene.restart();
        })
        Restart.button.setFontSize(30);
        Restart.blackButton();

        let MainMenu = new Button(centerX, centerY + 100, 'Main Menu', this, () => {
            // Stop ambient music
            this.playScene.ambient.stop();
            this.scene.stop(currScene);
            if (currScene == 'mailScene') this.scene.stop('computerScene');
            if (currScene != 'playScene') this.scene.stop('playScene');
            this.scene.start('titleScene');
        })
        MainMenu.button.setFontSize(30);
        MainMenu.blackButton();
    }

    update() {

    }
    
}
