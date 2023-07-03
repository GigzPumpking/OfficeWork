class EndDay extends Phaser.Scene {
    constructor() {
        super('endDayScene');
    }

    preload() {
        this.load.spritesheet('explosion', './assets/end_day-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 50});
    }

    create() {
        this.anim = this.add.sprite();

        this.animation = anim.anims.create({
            key: 'explode',
            frames: anim.anims.generateFrameNumbers('explosion', { start: 0, end: 50, first: 0}),
            frameRate: 30
        });
        this.anim.play('explode');

    }

    update() {

    }

}