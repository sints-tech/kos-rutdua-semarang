import {
    ExternalInteractorBase as e
} from "tsparticles-engine";
class Pauser extends e {
    constructor(e) {
        super(e);
        this.handleClickMode = e => {
            if ("pause" !== e) return;
            const t = this.container;
            t.getAnimationStatus() ? t.pause() : t.play()
        }
    }
    clear() {}
    init() {}
    async interact() {}
    isEnabled() {
        return true
    }
    reset() {}
}

function loadExternalPauseInteraction(e) {
    e.addInteractor("externalPause", (e => new Pauser(e)))
}
export {
    loadExternalPauseInteraction
};

//# sourceMappingURL=index.js.map