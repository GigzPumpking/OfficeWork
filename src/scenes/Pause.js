class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    preload() {
        this.load.path = './assets/';
        
        // Load pause sound
        this.load.audio('pause', 'sound/bean_pause.wav');
    }

    create() {

        // Play pause sound
        this.sound.play('pause', { volume: 1 });

        let pauseConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F0000C',
            color: '#000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let mainText = this.add.text(centerX, centerY - 200, ' Pause Menu ', pauseConfig).setOrigin(0.5);

        let Restart = new Button(centerX, centerY - 100, 'Restart', this, () => {
            this.scene.resume('playScene').stop();
            var sceneRestart = this.scene.get('playScene');
            // stop playing all sounds
            sceneRestart.level1.stop();
            sceneRestart.level2.stop();
            sceneRestart.level3.stop();
            sceneRestart.scene.restart();
        })
        let Resume = new Button(centerX, centerY, 'Resume', this, () => {
            this.scene.resume('playScene').stop();
        })

        Restart.button.setScale(2);
        Resume.button.setScale(2);

        Restart.blackButton();
        Resume.blackButton();
    }

    update() {

    }
    
}
