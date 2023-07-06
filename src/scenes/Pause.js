class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {
        dimBG(this, 0.6);
        this.volXOffset = 38.5*rescale;
        this.volLength = 30*rescale;
        this.barEnds = 12.5*rescale;

        // Adjust THIS variable to change the maximum volume from 2 / this.volumeMax (i.e. 2 / 3 = 66%)
        this.volumeMax = 3;

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
            this.sound.play('buttonPress', { volume: sfxAudio });
            music = [ambient, whiteNoise, burningAmbient, burningAmbient2];
            music.forEach(song => {
                if (song.isPaused) song.resume();
            })
            this.scene.resume(currScene).stop();
        })

        if (currScene != 'titleScene') {
            let Restart = new ButtonCreation(this, centerX - 1.5*rescale, centerY + 4.5*rescale, 'restartButton', rescale, () => {
                this.sound.play('buttonPress', { volume: sfxAudio });
                music = [ambient, whiteNoise, burningAmbient, burningAmbient2];
                music.forEach(song => {
                    if (song.isPlaying || song.isPaused) song.stop();
                })

                this.scene.resume(currScene).stop();
                this.scene.stop(currScene);
                if (currScene == 'mailScene') this.scene.stop('computerScene');
                if (currScene != 'playScene') this.scene.stop('playScene');
                this.scene.start('endDayScene');
            })

            let MainMenu = new ButtonCreation(this, centerX - rescale/2, centerY + 19.5*rescale, 'mainMenuButton', rescale, () => {
                this.sound.play('buttonPress', { volume: sfxAudio });
                if (currScene == 'titleScene') this.scene.resume('titleScene').stop();

                music = [ambient, whiteNoise, burningAmbient, burningAmbient2];
                music.forEach(music => {
                    if (music.isPlaying || music.isPaused) music.stop();
                })

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
        let currentVolume = this.volumeMax*this.barEnds * musicAudio + volumeBar.x - this.barEnds;
        let volumeCircle = this.add.sprite(currentVolume, centerY + rescale/2, 'sliderButton').setOrigin(0.5).setScale(rescale);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + this.scene.barEnds && dragX > volumeBar.x - this.scene.barEnds) this.x = dragX;
            else if (dragX < volumeBar.x - this.scene.barEnds) this.x = volumeBar.x - this.scene.barEnds;
            else if (dragX > volumeBar.x + this.scene.barEnds) this.x = volumeBar.x + this.scene.barEnds;

            musicAudio = (this.x - volumeBar.x + this.scene.barEnds) / this.scene.barEnds;
            musicAudio /= this.scene.volumeMax;
            music = [ambient, whiteNoise, burningAmbient, burningAmbient2];
            music.forEach(music => {
                music.config.volume = musicAudio;
            });
        });
    }

    sfxVolume() {
        // Add a rectangle to follow the circle
        let volumeBar = this.add.rectangle(centerX - this.volXOffset, centerY, this.volLength, 5, 0x000000).setOrigin(0.5).setAlpha(0);
        // Add a circle to be dragged horizontally to change volume
        let currentVolume = this.volumeMax*this.barEnds * sfxAudio + volumeBar.x - this.barEnds;
        let volumeCircle = this.add.sprite(currentVolume, centerY + rescale/2, 'sliderButton').setOrigin(0.5).setScale(rescale);
        volumeCircle.setInteractive({draggable: true});
    
        volumeCircle.on('drag', function(pointer, dragX) {
            if (dragX < volumeBar.x + this.scene.barEnds && dragX > volumeBar.x - this.scene.barEnds) this.x = dragX;
            else if (dragX < volumeBar.x - this.scene.barEnds) this.x = volumeBar.x - this.scene.barEnds;
            else if (dragX > volumeBar.x + this.scene.barEnds) this.x = volumeBar.x + this.scene.barEnds;

            sfxAudio = (this.x - volumeBar.x + this.scene.barEnds) / this.scene.barEnds;
            sfxAudio /= this.scene.volumeMax;
        });
    }
    
}
