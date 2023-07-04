class Paperball extends Phaser.Physics.Arcade.Sprite {
    //player character in scene 1
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this
            .setScale(3)
            .setGravityY(400)
            .setBounce(Math.random() * 0.1 + 0.1)
            .setInteractive({ draggable: true })
            .setCollideWorldBounds(false);
    }

    update() {

    }
}
