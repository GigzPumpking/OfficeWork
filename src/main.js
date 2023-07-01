let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [ Title, Play, Credits, HowTo, Pause ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;

let moneyConfig = {
    fontFamily: 'Belanosima',
    fontSize: '20px',
    color: '#FFFFFF',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    fixedWidth: 0
}

const textConfig = Object.assign({}, moneyConfig, { fontFamily: 'Belanosima', fontSize: '28px', backgroundColor: '#F0000C', color: '#000', align: 'center', fixedWidth: 0 });

const buttonConfig = Object.assign({}, moneyConfig, { fontFamily: 'Belanosima', fontSize: '16px', color: '#000', align: 'center', fixedWidth: 150 });

// config with relative positioning, expands text to the left instead of the right when text is added
// config with position relative

const valueConfig = Object.assign({}, moneyConfig, { fontSize: '16px', color: '#000', backgroundColor: '#FFFFFF', align: 'center', fixedWidth: 0 });

const popUpConfig = {
    fontFamily: 'Courier',
    fontSize: '36px',
    color: '#000',
    align: 'center'
}

maxedUpgrades = []; 

let keySPACE, keyC, keyH, keyESC, keyP;