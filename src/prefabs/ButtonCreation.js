// Modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class ButtonCreation extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, scale, callback) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
        this.callback = callback;
        this.scale = scale;
        this.ogScale = scale;
        this
            .setInteractive()
            .on('pointerdown', () => this.pointerDown())
            .on('pointerover', () => this.pointerOn())
            .on('pointerout',  () => this.pointerOut());
    }

    pointerDown() {
        this.callback();
    }

    pointerOn() {
        this.scale = this.ogScale * 1.1;
    }

    pointerOut() {
        this.scale = this.ogScale;
    }

    updateText(text) {
        this.button.setText(text);
    }
}