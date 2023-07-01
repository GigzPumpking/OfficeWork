// Slightly modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class Button {
    constructor(x, y, label, scene, callback, style) {
        this.scene = scene;
        this.callback = callback;
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .setStyle({ fontFamily: 'Belanosima', fill: '#FF0000' })
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
        this.scene.sound.play('confirm', { volume: 1 });
    }

    hoverOver() {
        // play a random select sound if the button is not filled in
        if (this.button.style.color != '#F39C12') {
            let rand = Math.floor(Math.random() * 2) + 1;
            this.scene.sound.play('select' + rand, { volume: 1 });
        }

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