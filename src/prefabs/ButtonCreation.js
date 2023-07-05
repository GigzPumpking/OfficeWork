// Modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class ButtonCreation extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, scale, callback) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene = scene;
        this.callback = callback;
        this.scale = scale;
        this.ogScale = scale;
        this.texture = texture;
        this.isDrawer = false;
        this.drawerOpen = false;
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
        if (this.texture == 'cigbox' || this.texture == 'lighter') {
            this.scale = this.ogScale * 1.05;
            this.y -= 1;
        }
        else if (!this.isDrawer) this.scale = this.ogScale * 1.1;
    }

    pointerOut() {
        if (this.texture == 'cigbox' || this.texture == 'lighter') {
            this.scale = this.ogScale;
            this.y += 1;
        }
        else if (!this.isDrawer) this.scale = this.ogScale;
    }

    drawerOn() {
        this.setTexture('drawer2', 0);
        this.x -= 30;
        this.y += 15;

        // Unhide this.scene's cigbox and lighter IF they are not in the inventory
        if (!inventory.includes('cigbox')) this.scene.cigbox.alpha = 1;

        if (!inventory.includes('lighter')) this.scene.lighter.alpha = 1;
    }

    drawerOut() {
        this.setTexture('drawer1', 0);
        this.x += 30;
        this.y -= 15;

        // Hide this.scene's cigbox and Lighter
        this.scene.cigbox.alpha = 0;
        this.scene.lighter.alpha = 0;
    }
}