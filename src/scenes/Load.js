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

        // Title Graphical Assets
        this.load.path = './assets/images/UI/';
        this.load.image('titleText', 'title_text.png');
        this.load.image('creditsButton', 'credits_button.png');
        this.load.image('tutorialButton', 'how_to_play_button.png');
        this.load.image('optionsButton', 'options_button.png');
        this.load.image('startButton', 'start_button.png');

        // Play Scene Graphical Assets
        this.load.path = './assets/';
        this.load.image('Silhouette', 'silhouette_sprites/silhouette_3.png');
        this.load.image('SilhouetteUP', 'silhouette_sprites/silhouette_lookingup.png');
        this.load.image('SilhouetteSTARE', 'silhouette_sprites/silhouette_stare.png');
        this.load.spritesheet('SilhouetteAnims', 'anims/silhouette_animation5-Sheet.png', {frameWidth: 23, frameHeight: 69, startFrame: 0, endFrame: 6});
        this.load.spritesheet('SmokingCigAnims', 'anims/smoking_ciggy-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 3});

        // Trash Basket and Paper Ball Graphical Assets
        this.load.path = './assets/images/trash_basket/';
        this.load.image('Basket0', 'empty_basket.png')
        this.load.image('Basket1', 'basket_filling_1.png');
        this.load.image('Basket2', 'basket_filling_2.png');
        this.load.image('Basket3', 'basket_filling_3.png');
        this.load.image('Basket4', 'basket_filling_4.png');
        this.load.image('paperball', 'paper_ball.png');
        this.load.image('fireBasketIdle', 'FireSpriteSheets/basket_fire_idle.png');
        this.load.image('fireBasketStart', 'FireSpriteSheets/basket_fire_start.png');
        this.load.image('fireBallIdle', 'FireSpriteSheets/flaming_ball_idle.png');
        this.load.image('fireBallThrown', 'FireSpriteSheets/flaming_ball_thrown.png');

        // Desk Graphical Assets
        this.load.path = './assets/desk_items/';
        this.load.image('ashtray0', 'ashtray_0.png');
        this.load.image('ashtray1', 'ashtray_1.png');
        this.load.image('ashtray2', 'ashtray_2.png');
        this.load.image('ashtray3', 'ashtray_3.png');
        this.load.image('cigbox', 'cigbox.png');
        this.load.image('keyboard', 'keyboardV4.png');
        this.load.image('computer', 'Computer.png');
        this.load.image('todoBoard', 'todo_board.png');

        // Office Graphical Assets
        this.load.path = './assets/office/';
        this.load.image('officeBG', 'Bg.png');
        this.load.image('cigLighter', 'cig_and_lighter.png');
        this.load.image('cubicles', 'cubicles.png');
        this.load.image('desk', 'desk.png');
        this.load.image('drawer1', 'drawer_closed.png');
        this.load.image('drawer2', 'drawer_open.png');

        // Computer Graphical Assets
        this.load.path = './assets/computer/';
        this.load.image('computerBG', 'computer_background.png');
        this.load.image('mail', 'mail_title.png');
        this.load.image('inbox', 'inbox_screen.png');

        // Paper Sorting Graphical Assets
        this.load.path = './assets/paper_sorting_game/';
        this.load.image('leftTray', 'left_tray.png');
        this.load.image('rightTray', 'right_tray.png');
        this.load.image('paperSortBG', 'paper_sort_bg.png');
        this.load.image('paperStackA', 'paper_stack_A.png');
        this.load.image('paperStackB', 'paper_stack_B.png');
        this.load.image('sortText', 'sort_text.png');
        this.load.image('paperA', 'paper_A.png');
        this.load.image('paperB', 'paper_B.png');

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