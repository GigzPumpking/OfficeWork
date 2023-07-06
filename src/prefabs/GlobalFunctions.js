function createBackButton(scene, stop, resume) {
    scene.backButton = new ButtonCreation(scene, w - 15*rescale, 10*rescale, 'backButton', rescale, () => {
        scene.sound.play('buttonPress', { volume: 2*sfxAudio });
        if (currScene == 'computerScene' && whiteNoise.isPlaying) whiteNoise.stop();
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    });
}

function createPauseButton(scene) {
    scene.pauseButton = new ButtonCreation(scene, w - 8*rescale, pauseY, 'pauseButton', rescale, () => {
        scene.sound.play('buttonPress', { volume: 2*sfxAudio });
        scene.scene.pause().launch('pauseScene');
    }).setDepth(6);
}

function createInventoryButton(scene) {
    scene.inventoryButton = new ButtonCreation(scene, w - 8*rescale, inventoryY, 'inventoryButton', rescale, () => {
        scene.sound.play('buttonPress', { volume: 2*sfxAudio });
        scene.scene.pause().launch('inventoryScene');
    }).setDepth(6);
}

function updateCurrPrev(curr, prev) {
    if (currScene != curr) currScene = curr;
    if (prevScene != prev) prevScene = prev;
}

function dimBG(scene, opacity) {
    scene.dimBG = scene.add.rectangle(0, 0, w, h, 0x000000, opacity).setOrigin(0, 0);
}

function timeUpdate(scene) {
    // Day Timer Stuff
    play.timeMS++;
    //console.log(this.timeMS);
    if (play.timeMS >= 600) {
        play.timeMS = 0;
        play.timeMins++;
        // increment frame of timeLeftUI
        play.timeLeftUI.setFrame(play.timeMins);
    }
    if (play.timeMins == 8 && play.timeMS >= 300) {
        if (currScene == 'inventoryScene') {
            if (prevScene == 'playScene') scene.scene.stop();
            else {
                if (prevScene == 'mailScene') {
                    scene.scene.stop();
                    mail.scene.stop();
                    computer.scene.stop();
                }
                else if (prevScene == 'computerScene' || prevScene == 'paperSortingGameScene' || prevScene == 'trashCanScene') {
                    var sceneStop = scene.scene.get(prevScene);
                    scene.scene.stop();
                    sceneStop.scene.stop();
                }
            }
        }
        else if (currScene == 'mailScene') {
            scene.scene.stop();
            computer.scene.stop();
            play.scene.start('endDayScene');
        }
        else {
            scene.scene.stop();
        }               
        play.scene.start('endDayScene'); 
    }
}

function jiggle( scene,element) {
    scene.tweens.add({
        targets: element,
        scaleX: element.scale - element.scale/20,
        scaleY: element.scale - element.scale/20,
        duration: 500,
        yoyo: true,
        repeat: -1
    });

    scene.tweens.add({
        targets: element,
        angle: 1,
        duration: 300,
        yoyo: true,
        ease: 'Sine.easeInOut',
        repeat: -1
    });
}