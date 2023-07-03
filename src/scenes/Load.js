class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');

        // See: https://github.com/nathanaltice/Paddle-Parkour-P360/blob/master/src/scenes/Load.js
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // Title Graphical Assets

        this.load.image('titleText', 'images/UI/title_text.png');
        this.load.image('creditsButton', 'images/UI/credits_button.png');
        this.load.image('tutorialButton', 'images/UI/how_to_play_button.png');
        this.load.image('optionsButton', 'images/UI/options_button.png');
        this.load.image('startButton', 'images/UI/start_button.png');

        // Play Scene Graphical Assets
        this.load.image('Silhouette', 'silhouette_sprites/silhouette_3.png');
        this.load.spritesheet('SilhouetteAnims', 'anims/silhouette_animation5-Sheet.png', {frameWidth: 23, frameHeight: 69, startFrame: 0, endFrame: 6});
        this.load.spritesheet('SmokingCigAnims', 'anims/smoking_ciggy-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 3});

        // Trash Basket and Paper Ball Graphical Assets
        this.load.image('Basket0', 'images/trash_basket/empty_basket.png')
        this.load.image('Basket1', 'images/trash_basket/basket_filling_1.png');
        this.load.image('Basket2', 'images/trash_basket/basket_filling_2.png');
        this.load.image('Basket3', 'images/trash_basket/basket_filling_3.png');
        this.load.image('Basket4', 'images/trash_basket/basket_filling_4.png');
        this.load.image('paperball', 'images/trash_basket/paper_ball.png');
        this.load.image('fireBasketIdle', 'images/trash_basket/FireSpriteSheets/basket_fire_idle.png');
        this.load.image('fireBasketStart', 'images/trash_basket/FireSpriteSheets/basket_fire_start.png');
        this.load.image('fireBallIdle', 'images/trash_basket/FireSpriteSheets/flaming_ball_idle.png');
        this.load.image('fireBallThrown', 'images/trash_basket/FireSpriteSheets/flaming_ball_thrown.png');

        // Desk Graphical Assets
        this.load.image('ashtray0', 'desk_items/ashtray_0.png');
        this.load.image('ashtray1', 'desk_items/ashtray_1.png');
        this.load.image('ashtray2', 'desk_items/ashtray_2.png');
        this.load.image('ashtray3', 'desk_items/ashtray_3.png');
        this.load.image('cigbox', 'desk_items/cigbox.png');
        this.load.image('keyboard', 'desk_items/keyboardV4.png');

        // Computer Graphical Assets
        this.load.image('computer', 'computer/computer_background.png');
        this.load.image('mail', 'computer/mail_title.png');
        this.load.image('inbox', 'computer/inbox_screen.png');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('titleScene');
    }
}