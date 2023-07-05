function createBackButton(scene, stop, resume) {
    scene.backButton = new Button(w - 42.5, 25, 'Back', scene, textConfig, () => {
        scene.scene.stop(stop);
        scene.scene.resume(resume);
    });
    scene.backButton.button.setFontSize(24);
    scene.backButton.whiteButton();
    scene.backButton.button.setBackgroundColor('#000000');
}

function createPauseButton(scene) {
    scene.pauseButton = new Button(50, 25, 'Pause', scene, textConfig, () => {
        scene.scene.pause().launch('pauseScene');
    });
    scene.pauseButton.whiteButton();
    scene.pauseButton.button.setFontSize(24);
    scene.pauseButton.button.setBackgroundColor('#000000');
}

function createInventoryButton(scene) {
    scene.inventoryButton = new Button(78.5, 75, 'Inventory', scene, textConfig, () => {
        scene.scene.pause().launch('inventoryScene');
    });
    scene.inventoryButton.whiteButton();
    scene.inventoryButton.button.setFontSize(24);
    scene.inventoryButton.button.setBackgroundColor('#000000');
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