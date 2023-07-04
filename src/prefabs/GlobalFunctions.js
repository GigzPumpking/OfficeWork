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

function updateCurrPrev(curr, prev) {
    if (currScene != curr) currScene = curr;
    if (prevScene != prev) prevScene = prev;
}

function dimBG(scene, opacity) {
    scene.dimBG = scene.add.rectangle(0, 0, w, h, 0x000000, opacity).setOrigin(0, 0);
}