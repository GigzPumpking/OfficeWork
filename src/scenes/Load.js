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
        this.load.image('keyboard', 'keyboard_fit.png');
        this.load.image('computer', 'Computer.png');
        this.load.image('todoBoard', 'todo_board.png');
        this.load.image('deskTrays', 'desk_papertrays.png');
        this.load.image('clock', 'clock.png');
        this.load.spritesheet('time', 'time_spritesheet.png', {frameWidth: 17, frameHeight: 4, startFrame: 0, endFrame: 8});

        // Office Graphical Assets
        this.load.path = './assets/office/';
        this.load.image('officeBG', 'Bg.png');
        this.load.image('cigLighter', 'cig_and_lighter.png');
        this.load.image('cubicles', 'cubicles.png');
        this.load.image('desk', 'desk.png');
        this.load.image('drawer1', 'drawer_closed.png');
        this.load.image('drawer2', 'drawer_open.png');
        this.load.image('emailTask', 'send_emails_todo.png');
        this.load.image('paperTask', 'sort_papers_todo.png');

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
        this.load.audio('titleAmbient', 'titleAmbient.wav');
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
        this.load.audio('buttonPress', 'buttonPress.wav');
        this.load.audio('drawerOpen', 'drawerOpen.wav');
        this.load.audio('drawerClose', 'drawerClose.wav');
        this.load.audio('fireAlarm', 'fireAlarm.flac');
        this.load.audio('burningAmbient', 'burningAmbient.wav');
        this.load.audio('sendMail', 'sendMail.wav');
        this.load.audio('sendMailFail', 'sendMailFail.wav');
        this.load.audio('endDay', 'endDay.wav');
        this.load.audio('pop1', 'suck1.wav');
        this.load.audio('pop2', 'suck2.wav');

        // Inventory Assets
        this.load.path = './assets/UI/inventory/';
        this.load.image('inventoryButton', 'inventory_button.png');
        this.load.image('inventory', 'inventory.png');
        this.load.image('inventoryBox', 'inventory_box.png');
        this.load.image('resume', 'resume_button.png');

        // Pause Menu Assets
        this.load.path = './assets/UI/pause_menu/';
        this.load.image('pauseButton', 'pause_button2.png');
        this.load.image('pauseMenu', 'pause_menu.png');
        this.load.image('resumeButton', 'resume_button.png');
        this.load.image('restartButton', 'restart_button.png');
        this.load.image('sliderButton', 'slider_button.png');
        this.load.image('mainMenuButton', 'main_menu_button.png');

        // UI Assets
        this.load.path = './assets/UI/';
        this.load.image('backButton', 'back_button.png');
        this.load.image('downarrow', 'downarrow.png');
        this.load.image('uparrow', 'uparrow.png');
        this.load.image('optionsMenu', 'options.png');
        this.load.image('replyGreen', 'reply_green.png');
        this.load.image('replyWhite', 'reply_white.png');
        this.load.image('sentGreen', 'sent_green.png');
        this.load.image('sendWhite', 'send_white.png');
        this.load.image('sendGreen', 'send_green.png');
        this.load.image('saveButton', 'save_button.png');
        this.load.image('loadButton', 'load_button.png');

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

        titleAmbient = title.sound.add('titleAmbient', { volume: musicAudio, loop: true });
        ambient = play.sound.add('ambient', { volume: musicAudio, loop: true });
        whiteNoise = computer.sound.add('whitenoise', { volume: musicAudio, loop: true });
        burningAmbient = trashgame.sound.add('burningAmbient', { volume: musicAudio, loop: true });
        burningAmbient2 = play.sound.add('burningAmbient', { volume: musicAudio, loop: true });

        music = [ambient, whiteNoise, burningAmbient, burningAmbient2];

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