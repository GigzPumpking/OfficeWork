class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {
        dimBG(this, 0.6);
        this.volXOffset = 38.5*rescale;
        this.volLength = 30*rescale;

        // Create pause menu
        this.menu = this.add.sprite(centerX, centerY, 'pauseMenu').setScale(rescale);

        if (currScene != 'titleScene') {
            if (ambient.isPlaying) ambient.pause();
        }

        if (currScene == 'computerScene' || currScene == 'mailScene') {
            if (whiteNoise.isPlaying) whiteNoise.pause();
        }

        this.musicVolume();
        this.sfxVolume();

        let Resume = new ButtonCreation(this, centerX - 1.5*rescale, centerY - 11.5*rescale, 'resumeButton', rescale, () => {
            if (ambient.isPaused) ambient.resume();
            if (whiteNoise.isPaused) whiteNoise.resume();
            this.scene.resume(currScene).stop();
        })

        if (currScene != 'titleScene') {
            let Restart = new ButtonCreation(this, centerX - 1.5*rescale, centerY + 4.5*rescale, 'restartButton', rescale, () => {
                if (ambient.isPlaying || ambient.isPaused) ambient.stop();
                if (whiteNoise.isPlaying || whiteNoise.isPaused) whiteNoise.stop();

                this.scene.resume(currScene).stop();
                this.scene.stop(currScene);
                if (currScene == 'mailScene') this.scene.stop('computerScene');
                if (currScene != 'playScene') this.scene.stop('playScene');
                this.scene.start('endDayScene');
            })

            let MainMenu = new ButtonCreation(this, centerX - rescale/2, centerY + 19.5*rescale, 'mainMenuButton', rescale, () => {
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();

                if (ambient.isPlaying || ambient.isPaused) ambient.stop();
                if (whiteNoise.isPlaying || whiteNoise.isPaused) whiteNoise.stop();

                this.scene.stop(currScene);
                if (currScene == 'mailScene') this.scene.stop('computerScene');
                if (currScene != 'playScene') this.scene.stop('playScene');
                this.scene.start('titleScene');
            })
        }
    }

    musicVolume() {

        // Add a rectangle to follow the circle
        let volumeBar = this.add.rectangle(centerX + this.volXOffset - 2*rescale, centerY, this.volLength, 5, 0x000000).setOrigin(0.5).setAlpha(0);
        // Add a circle to be dragged horizontally to change volume
        let currentVolume = this.volLength * musicAudio + volumeBar.x - 100;
        let volumeCircle = this.add.sprite(currentVolume, centerY + rescale/2, 'sliderButton').setOrigin(0.5).setScale(rescale);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + 12.5*rescale && dragX > volumeBar.x - 12.5*rescale) this.x = dragX;
            else if (dragX < volumeBar.x - 12.5*rescale) this.x = volumeBar.x - 12.5*rescale;
            else if (dragX > volumeBar.x + 12.5*rescale) this.x = volumeBar.x + 12.5*rescale;

            musicAudio = (this.x - volumeBar.x + 12.5*rescale) / 20*rescale;
            music = [ambient, whiteNoise];
            music.forEach(music => {
                music.config.volume = musicAudio;
            });
        });
    }

    sfxVolume() {

        // Add a rectangle to follow the circle
        let volumeBar = this.add.rectangle(centerX - this.volXOffset, centerY, this.volLength, 5, 0x000000).setOrigin(0.5).setAlpha(0);
        // Add a circle to be dragged horizontally to change volume
        let currentVolume = this.volLength * sfxAudio + volumeBar.x - 10*rescale;
        let volumeCircle = this.add.sprite(currentVolume, centerY + rescale/2, 'sliderButton').setOrigin(0.5).setScale(rescale);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + 12.5*rescale && dragX > volumeBar.x - 12.5*rescale) this.x = dragX;
            else if (dragX < volumeBar.x - 12.5*rescale) this.x = volumeBar.x - 12.5*rescale;
            else if (dragX > volumeBar.x + 12.5*rescale) this.x = volumeBar.x + 12.5*rescale;

            sfxAudio = (this.x - volumeBar.x + 12.5*rescale) / 20*rescale;
        });
    }
    
}
