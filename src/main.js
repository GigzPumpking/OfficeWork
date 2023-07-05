let config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
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
    scene: [ Load, Title, EndDay, Play, Computer, Mail, PaperSortingGame, Trashcan, Credits, HowTo, Pause, Inventory ]
}

let game = new Phaser.Game(config);

let w = game.config.width;
let h = game.config.height;

let rescale = w / 192;
let centerX = w/2;
let centerY = h/2;
let centerYP = h/2 + 20*rescale

let currScene = null;
let prevScene = null;

let trashNum = 0;
let trashNumMax = 4;
let trashFilled = 0;
let paperballStatus = 'paperball';
let flamesScale = 2.8;
let maxFlamesScale = 3.5;
let trashBurning = false;

let cigsSmoked = 0;
let maxCigsSmoked = 3;

let inventory = [];

// Default Text Config

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    color: '#000',
    align: 'center',
    padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    fixedWidth: 0
}

// Text Config for Buttons

const buttonConfig = Object.assign({}, textConfig, {fontSize: '16px', fixedWidth: 150});

// Text Config for Pop Up Text

const popUpConfig = Object.assign({}, textConfig, {fontFamily: 'Courier', fontSize: '36px', fixedWidth: 150});

// Text Config for Title Text

const titleConfig = Object.assign({}, textConfig, {fontSize: '60px', color: '#FFF21A'});

// Text Config for Title Buttons Text

const titleButtonConfig = Object.assign({}, textConfig, {fontFamily: 'Fantasy', fontSize: '27px', color: '#FFF21A'});

// Text Config for Pause Menu

const pauseConfig = Object.assign({}, textConfig, {fontSize: '48px', backgroundColor: '#F0000C'});

// Text Config for Credits Menu

const creditsConfig = Object.assign({}, textConfig, {fontFamily: 'Verdana', fontSize: '22px', backgroundColor: '#383B3C', color: '#FFFFFF', align: 'left'});

// Text Config for Timer

const timerConfig = Object.assign({}, textConfig, {fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', fixedWidth: 100});

let keySPACE, keyESC;

let keyC, keyO, keyP, keyI;

let mailNum = 0;
let savedMail1 = null;
let savedMail2 = null;
let savedMail3 = null;

let mail1Status = false;
let mail1WCReq = 50;
let mail2Status = false;
let mail2WCReq = 35;
let mail3Status = false;
let mail3WCReq = 20;

let savedMail1Stats = [0, 0, [], 0];
let savedMail2Stats = [0, 0, [], 0];
let savedMail3Stats = [0, 0, [], 0];

let mailStatus = [mail1Status, mail2Status, mail3Status];

let papersSorted = false;

let loadRegular = false;

let musicAudio = 0.5;
let sfxAudio = 0.5;

let load = null
let title = null
let play = null
let computer = null
let mail = null
let papergame = null
let trashgame = null
let credits = null
let options = null

let ambient = null;
let whiteNoise = null;

let music = [ambient, whiteNoise];

