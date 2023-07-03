class EndDay extends Phaser.Scene {
    constructor() {
        super('endDayScene');
    }

    preload() {
        this.load.spritesheet('explode', './assets/anims/end_day-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 50});
    }

    create() {
        this.EndDay = this.add.sprite(0, 0, 'explode').setOrigin(0, 0);
        this.EndDay.displayWidth = game.config.width;
        this.EndDay.displayHeight = game.config.height;

        this.animation = this.EndDay.anims.create({
            key: 'explode',
            frames: this.EndDay.anims.generateFrameNumbers('explode', { start: 0, end: 50, first: 0}),
            frameRate: 30
        });

        this.EndDay.play('explode');
        // Wait one second
        this.EndDay.on('animationcomplete', () => {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('playScene');
                },
                loop: false
            });
        });
    }

    update() {

    }

}