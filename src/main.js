let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 540,
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
    scene: [ Load, Title, EndDay, Play, Computer, Mail, PaperSortingGame, Trashcan, Credits, Pause, Inventory ]
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

let playPan = false;

let trashNum = 0;
let trashNumMax = 4;
let trashFilled = 0;
let paperballStatus = 'paperball';
let flamesScale = rescale/2;
let maxFlamesScale = rescale/1.25;
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
};

textConfig.fontSize = 2*rescale;

// Text Config for Title Text

const titleConfig = Object.assign({}, textConfig, {fontSize: '60px', color: '#FFF21A'});

// Set titleConfig fontSize to 6*rescale

titleConfig.fontSize = 12*rescale;

// Text Config for Pop Up Text (Unused?)

const popUpConfig = Object.assign({}, textConfig, {fontFamily: 'Courier', fontSize: '36px', fixedWidth: 150});

// Set popUpConfig fontSize to 3.6*rescale

popUpConfig.fontSize = 7.2*rescale;

// Text Config for Credits Menu

const creditsConfig = Object.assign({}, textConfig, {fontFamily: 'Verdana', fontSize: '22px', backgroundColor: '#383B3C', color: '#FFFFFF', align: 'left'});

// Set creditsConfig fontSize to 2.2*rescale
creditsConfig.fontSize = 4.4*rescale;

let keySPACE, keyESC;

let keyC, keyO, keyP, keyI;

let pauseY = h - (centerY + 13.5*rescale)
let inventoryY = h - (centerY + 1*rescale)

let downY = centerYP + 12.5*rescale
let upY = centerYP - 6*rescale;

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

let titleAmbient = null;
let ambient = null;
let whiteNoise = null;
let burningAmbient = null;
let burningAmbient2 = null;

let music = [ambient, whiteNoise];

