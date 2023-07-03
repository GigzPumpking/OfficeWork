let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 562.5,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [ Load, Title, Play, Computer, Mail, Credits, HowTo, Pause ]
}

let game = new Phaser.Game(config);

let w = game.config.width;
let h = game.config.height;
let centerX = game.config.width/2;
let centerY = game.config.height/2;

let currScene = null;

// Default Text Config

let textConfig = {
    fontFamily: 'Belanosima',
    fontSize: '20px',
    color: '#000',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    fixedWidth: 150
}

// Text Config for Buttons

const buttonConfig = Object.assign({}, textConfig, {fontSize: '16px'});

// Text Config for Pop Up Text

const popUpConfig = Object.assign({}, textConfig, {fontFamily: 'Courier', fontSize: '36px'});

// Text Config for Title Text

const titleConfig = Object.assign({}, textConfig, {fontFamily: 'Belanosima', fontSize: '60px', color: '#FFF21A', fixedWidth: 0});

// Text Config for Title Buttons Text

const titleButtonConfig = Object.assign({}, textConfig, {fontFamily: 'Fantasy', fontSize: '27px', color: '#FFF21A', fixedWidth: 0});

// Text Config for Pause Menu

const pauseConfig = Object.assign({}, textConfig, {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F0000C', fixedWidth: 0});

// Text Config for Credits Menu

const creditsConfig = Object.assign({}, textConfig, {fontFamily: 'Verdana', fontSize: '28px', backgroundColor: '#303030', color: '#FFFFFF', align: 'left', fixedWidth: 0});

let keySPACE, keyESC;

let keyC, keyH, keyP;

let mailNum = 0;
let savedMail1 = null;
let savedMail2 = null;
let savedMail3 = null;

let savedMail1Stats = [0, 0, []];
let savedMail2Stats = [0, 0, []];
let savedMail3Stats = [0, 0, []];