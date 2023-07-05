class Paperball extends Phaser.Physics.Arcade.Sprite {
    //player character in scene 1
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (paperballStatus == 'fireBallThrown') {
            this.burning = true;
            this.anims.play('fireBallThrown');
        }
        else this.burning = false;

        this
            .setScale(Math.random()*rescale/3 + rescale/2.5)
            .setGravityY(40*rescale)
            .setBounce(Math.random() * 0.1 + 0.1)
            .setInteractive({ draggable: true })
            .setCollideWorldBounds(false);
    }

    update() {

        // If not moving and touching floor, destroy
        if (this.body.velocity.x == 0 && this.body.touching.down) {
            this.scene.paperballs.splice(this.scene.paperballs.indexOf(this), 1);
            // Fade out and destroy
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.destroy();
                }
            });
        } 
        else if (this.body.velocity.x <= 10*rescale && this.body.velocity.x >= -10*rescale) {
            if (this.burning) this.anims.play('fireBallIdle');
            if (this.rotation < 0 || this.rotation > 0) {
                this.scene.tweens.add({
                    targets: this,
                    rotation: 0,
                    duration: 50,
                    ease: 'Quadratic'
                });
            }
        }
        else {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }
    }
}
