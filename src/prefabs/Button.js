// Modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class Button {
    constructor(x, y, label, scene, callback, style) {
        this.scene = scene;
        this.callback = callback;
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .setStyle({ fontFamily: 'Belanosima', fill: '#FF0000', align: 'center'})
            .on('pointerdown', () => this.pointerDown())
            .on('pointerover', () => this.hoverOver())
            .on('pointerout',  () => this.button.setStyle({ fill: '#FF0000' }))

        this.status = 'red';
    }

    changePosition(y) {
        this.button.y = y;
    }

    pointerDown() {
        this.callback();
    }

    hoverOver() {
        this.button.setStyle({ fill: '#F39C12' });
    }

    blackButton() {
        this.button.setStyle({ fill: '#000000' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#000000' }));
    }

    whiteButton() {
        this.button.setStyle({ fill: '#FFFFFF' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#FFFFFF' }));
    }

    redButton() {
        this.button.setStyle({ fill: '#FF0000' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#FF0000' }));
        this.status = 'red';
    }

    greenButton() {
        this.button.setStyle({ fill: '#00FF00' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#00FF00' }));
        this.status = 'green';
    }

    updateText(text) {
        this.button.setText(text);
    }

    destroy() {
        this.button.destroy();
    }
}