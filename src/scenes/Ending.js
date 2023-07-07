class Ending extends Phaser.Scene {
    constructor() {
        super('endingScene');
    }

    create() {
        // stop all sounds
        this.sound.stopAll();

        // play burningAmbient
        burningAmbient3.play();

        this.End = this.add.sprite(0, 0, 'endScene').setOrigin(0, 0).setScale(rescale);

        this.End.anims.create({
            key: 'endSceneAnims',
            frames: this.End.anims.generateFrameNumbers('endScene', { start: 0, end: 59, first: 0}),
            frameRate: 12,
            repeat: 0
        });

        this.End.anims.create({
            key: 'endTitleAnims',
            frames: this.End.anims.generateFrameNumbers('endTitle', { start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        this.End.anims.create({
            key: 'endInitialLoop',
            frames: this.End.anims.generateFrameNumbers('endScene', { start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        this.End.play('endInitialLoop');

        // fade in from white over 3 seconds
        this.cameras.main.fadeIn(3000, 255, 255, 255);

        // on finish, play end title
        this.cameras.main.on('camerafadeincomplete', () => {
            this.sound.play('fireAlarm', { volume: sfxAudio });
            this.End.play('endSceneAnims');
    
            // on finish, play end title
            this.End.on('animationcomplete', () => {
                this.End.play('endTitleAnims');
                // fade in restart button to the top right corner
                this.mainMenuButton = new ButtonCreation(this, w - 5*rescale, 5*rescale, 'mainMenuButton', rescale, () => {
                    this.sound.play('buttonPress', { volume: 0.5 });
                    this.cameras.main.fadeOut(3000, 255, 255, 255);
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.scene.start('titleScene');
                    });
                }
                ).setOrigin(1, 0).setAlpha(0);
                this.tweens.add({
                    targets: this.mainMenuButton,
                    alpha: { from: 0, to: 1 },
                    duration: 3000,
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: false
                });
            }
            );
        });

    }

    update() {

    }

}