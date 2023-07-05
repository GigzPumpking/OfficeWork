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

        // New Title Graphical Assets
        this.load.path = './assets/title_screen/';
        this.load.image('TITLE', 'TITLE.png');
        this.load.image('CREDITS', 'credits_button.png');
        this.load.image('OPTIONS', 'options_button.png');
        this.load.image('START', 'start_button.png');

        // Animations
        this.load.path = './assets/anims/';
        this.load.spritesheet('explode', 'end_day-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 50});
        this.load.spritesheet('SilhouetteAnims', 'silhouette_animation5-Sheet.png', {frameWidth: 23, frameHeight: 69, startFrame: 0, endFrame: 6});
        this.load.spritesheet('SmokingCigAnims', 'smoking_ciggy-Sheet.png', {frameWidth: 192, frameHeight: 108, startFrame: 0, endFrame: 33});

        // Play Scene Graphical Assets
        this.load.path = './assets/';
        this.load.image('Silhouette', 'silhouette_sprites/silhouette_3.png');
        this.load.image('SilhouetteUP', 'silhouette_sprites/silhouette_lookingup.png');
        this.load.image('SilhouetteSTARE', 'silhouette_sprites/silhouette_stare.png');

        // Trash Basket and Paper Ball Graphical Assets
        this.load.path = './assets/images/trash_basket/';
        this.load.image('Basket0', 'empty_basket.png')
        this.load.image('Basket1', 'basket_filling_1.png');
        this.load.image('Basket2', 'basket_filling_2.png');
        this.load.image('Basket3', 'basket_filling_3.png');
        this.load.image('Basket4', 'basket_filling_4.png');
        this.load.image('paperball', 'paper_ball.png');

        // Load fire ball and basket animations
        this.load.path = './assets/images/trash_basket/FireSpriteSheets/';
        this.load.spritesheet('fireBasketIdle', 'basket_fire_idle.png', {frameWidth: 75, frameHeight: 85, startFrame: 0, endFrame: 5});
        this.load.spritesheet('fireBasketStart', 'basket_fire_start.png', {frameWidth: 75, frameHeight: 85, startFrame: 0, endFrame: 5});
        this.load.spritesheet('fireBallIdle', 'flaming_ball_idle.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('fireBallThrown', 'flaming_ball_thrown.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});

        // Desk Graphical Assets
        this.load.path = './assets/desk_items/';
        this.load.image('ashtray0', 'ashtray_0.png');
        this.load.image('ashtray1', 'ashtray_1.png');
        this.load.image('ashtray2', 'ashtray_2.png');
        this.load.image('ashtray3', 'ashtray_3.png');
        this.load.image('cigbox', 'cigbox.png');
        this.load.image('lighter', 'lighter.png');
        this.load.image('keyboard', 'keyboardV4.png');
        this.load.image('computer', 'Computer.png');
        this.load.image('todoBoard', 'todo_board.png');
        this.load.image('deskTrays', 'desk_papertrays.png');
        this.load.image('clock', 'clock.png');

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

        // Audio Assets
        this.load.path = './assets/sound/';
        this.load.audio('ambient', 'ambient.mp3');
        this.load.audio('phones1', 'phones1.wav');
        this.load.audio('phones2', 'phones2.wav');
        this.load.audio('phones3', 'phones3.wav');
        this.load.audio('phones4', 'phones4.wav');
        this.load.audio('whitenoise', 'whitenoise.wav');
        this.load.audio('fireStart', 'fireStart.mp3');
        this.load.audio('cigBurn', 'cigaretteBurn.wav');
        this.load.audio('keyClack1', 'keyClack1.wav');
        this.load.audio('keyClack2', 'keyClack2.wav');
        this.load.audio('keyClack3', 'keyClack3.wav');
        this.load.audio('keyClack4', 'keyClack4.wav');
        this.load.audio('paperThrow', 'paperThrow.wav');
    }

    create() {
        load = this.scene.get('loadScene');
        title = this.scene.get('titleScene');
        play = this.scene.get('playScene');
        computer = this.scene.get('computerScene');
        mail = this.scene.get('mailScene');
        papergame = this.scene.get('paperSortScene');
        trashgame = this.scene.get('trashCanScene');
        credits = this.scene.get('creditsScene');
        options = this.scene.get('pauseScene');

        ambient = play.sound.add('ambient', { volume: musicAudio, loop: true });
        whiteNoise = computer.sound.add('whitenoise', { volume: musicAudio, loop: true });

        music = [ambient, whiteNoise];

        // load animation for fireBalls in trashgame
        trashgame.anims.create({
            key: 'fireBallThrown',
            frames: trashgame.anims.generateFrameNumbers('fireBallThrown', { start: 0, end: 6, first: 0}),
            frameRate: 14,
            repeat: -1
        });
        trashgame.anims.create({
            key: 'fireBallIdle',
            frames: trashgame.anims.generateFrameNumbers('fireBallIdle', { start: 0, end: 6, first: 0}),
            frameRate: 14,
            repeat: -1
        });

        // load animation for fireBasket in trashgame AND play
        trashgame.anims.create({
            key: 'fireBasketStart',
            frames: trashgame.anims.generateFrameNumbers('fireBasketStart', { start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: 0
        });

        trashgame.anims.create({
            key: 'fireBasketIdle',
            frames: trashgame.anims.generateFrameNumbers('fireBasketIdle', { start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        play.anims.create({
            key: 'fireBasketIdleP',
            frames: play.anims.generateFrameNumbers('fireBasketIdle', { start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });

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