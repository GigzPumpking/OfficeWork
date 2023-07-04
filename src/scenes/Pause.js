class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {
        dimBG(this, 0.9);
        // Change the color of the rectangle dimBG
        this.dimBG.setFillStyle(0xFFFFFF, 0.9);

        if (currScene != 'titleScene') {
            if (ambient.isPlaying) ambient.pause();
        }

        if (currScene == 'computerScene' || currScene == 'mailScene') {
            if (whiteNoise.isPlaying) whiteNoise.pause();
        }

        this.musicVolume();
        this.sfxVolume();

        let mainText = this.add.text(centerX, centerY - 200, 'Options Menu', pauseConfig).setOrigin(0.5);

        let Resume = new Button(centerX, centerY - 100, 'Resume', this, textConfig, () => {
            if (ambient.isPaused) ambient.resume();
            if (whiteNoise.isPaused) whiteNoise.resume();
            this.scene.resume(currScene).stop();
        })
        Resume.button.setFontSize(30);
        Resume.blackButton();

        if (currScene != 'titleScene') {
            let Restart = new Button(centerX, centerY, 'Restart', this, textConfig, () => {
                if (ambient.isPlaying || ambient.isPaused) ambient.stop();
                if (whiteNoise.isPlaying || whiteNoise.isPaused) whiteNoise.stop();

                this.scene.resume(currScene).stop();
                this.scene.stop(currScene);
                if (currScene == 'mailScene') this.scene.stop('computerScene');
                if (currScene != 'playScene') this.scene.stop('playScene');
                this.scene.start('endDayScene');
            })
            Restart.button.setFontSize(30);
            Restart.blackButton();

            let MainMenu = new Button(centerX, centerY + 100, 'Main Menu', this, textConfig, () => {
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();

                if (ambient.isPlaying || ambient.isPaused) ambient.stop();
                if (whiteNoise.isPlaying || whiteNoise.isPaused) whiteNoise.stop();

                this.scene.stop(currScene);
                if (currScene == 'mailScene') this.scene.stop('computerScene');
                if (currScene != 'playScene') this.scene.stop('playScene');
                this.scene.start('titleScene');
            })
            MainMenu.button.setFontSize(30);
            MainMenu.blackButton();
        }
    }

    update() {

    }

    musicVolume() {
        // Add music volume text
        this.musicVolumeText = this.add.text(centerX + 200, centerY - 100, 'Music Volume', textConfig).setOrigin(0.5);

        // Add a rectangle to follow the circle
        let volumeBar = this.add.rectangle(centerX + 200, centerY - 50, 200, 5, 0x000000).setOrigin(0.5);
        // Add a circle to be dragged horizontally to change volume
        let currentVolume = 200 * musicAudio + volumeBar.x - 100;
        let volumeCircle = this.add.circle(currentVolume, centerY - 50, 10, 0xff0000).setOrigin(0.5);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + 100 && dragX > volumeBar.x - 100) this.x = dragX;
            else if (dragX < volumeBar.x - 100) this.x = volumeBar.x - 100;
            else if (dragX > volumeBar.x + 100) this.x = volumeBar.x + 100;

            musicAudio = (this.x - volumeBar.x + 100) / 200;
            music = [ambient, whiteNoise];
            music.forEach(music => {
                music.config.volume = musicAudio;
            });
        });
    }

    sfxVolume() {
        // Add sfx volume text
        this.sfxVolumeText = this.add.text(centerX - 200, centerY - 100, 'sfx Volume', textConfig).setOrigin(0.5);

        // Add a rectangle to follow the circle
        let volumeBar = this.add.rectangle(centerX - 200, centerY - 50, 200, 5, 0x000000).setOrigin(0.5);
        // Add a circle to be dragged horizontally to change volume
        let currentVolume = 200 * sfxAudio + volumeBar.x - 100;
        let volumeCircle = this.add.circle(currentVolume, centerY - 50, 10, 0xff0000).setOrigin(0.5);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + 100 && dragX > volumeBar.x - 100) this.x = dragX;
            else if (dragX < volumeBar.x - 100) this.x = volumeBar.x - 100;
            else if (dragX > volumeBar.x + 100) this.x = volumeBar.x + 100;

            sfxAudio = (this.x - volumeBar.x + 100) / 200;
        });
    }
    
}
