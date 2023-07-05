function createBackButton(scene, stop, resume) {
    scene.backButton = new Button(w - 85, 50, 'Back', scene, textConfig, () => {
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    });
    scene.backButton.button.setFontSize(48);
    scene.backButton.whiteButton();
    scene.backButton.button.setBackgroundColor('#000000');
}

function createPauseButton(scene) {
    scene.pauseButton = new Button(100, 50, 'Pause', scene, textConfig, () => {
        scene.scene.pause().launch('pauseScene');
    });
    scene.pauseButton.whiteButton();
    scene.pauseButton.button.setFontSize(48);
    scene.pauseButton.button.setBackgroundColor('#000000');
    scene.pauseButton.button.setDepth(6);
}

function createInventoryButton(scene) {
    scene.inventoryButton = new Button(157, 150, 'Inventory', scene, textConfig, () => {
        scene.scene.pause().launch('inventoryScene');
    });
    scene.inventoryButton.whiteButton();
    scene.inventoryButton.button.setFontSize(48);
    scene.inventoryButton.button.setBackgroundColor('#000000');
    scene.inventoryButton.button.setDepth(6);
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
        scene.scene.start('endDayScene');                
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