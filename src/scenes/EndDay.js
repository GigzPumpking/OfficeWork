class EndDay extends Phaser.Scene {
    constructor() {
        super('endDayScene');
    }

    preload() {
        this.load.spritesheet('explode', './assets/anims/end_day-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 50});
    }

    create() {
        //if burningAmbient is playing, stop it
        if (burningAmbient.isPlaying) burningAmbient.stop();
        if (burningAmbient2.isPlaying) burningAmbient2.stop();
        
        this.EndDay = this.add.sprite(0, 0, 'explode').setOrigin(0, 0).setDepth(6);
        this.EndDay.displayWidth = game.config.width;
        this.EndDay.displayHeight = game.config.height;

        this.animationInitial = this.EndDay.anims.create({
            key: 'explodeInitial',
            frames: this.EndDay.anims.generateFrameNumbers('explode', { start: 40, end: 50, first: 0}),
            frameRate: 30
        });

        this.animationRegular = this.EndDay.anims.create({
            key: 'explodeRegular',
            frames: this.EndDay.anims.generateFrameNumbers('explode', { start: 0, end: 50, first: 0}),
            frameRate: 30, 
        });

        if (loadRegular) {
            this.EndDay.play('explodeRegular');
        } else {
            this.EndDay.play('explodeInitial');
            loadRegular = true;
        }

        this.endSound = this.sound.add('endDay', {volume: sfxAudio, loop: false});
        this.endSound.play();
        this.tweens.add({
            targets: this.endSound,
            volume: 0,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.endSound.stop();
            }
        });

        // Wait one second
        this.EndDay.on('animationcomplete', () => {
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    // fade away this.EndDay
                    this.tweens.add({
                        targets: this.EndDay,
                        alpha: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () => {
                            this.scene.start('playScene');
                        }
                    });
                },
                loop: false
            });
        });
    }

    update() {

    }

}