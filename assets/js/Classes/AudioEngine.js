export class AudioEngine {
    initialize() {
    }
    constructor() {
        this.FILE_MAP = {
            "angi": "assets/sounds/angi.ogg",
            "click": "assets/sounds/click.ogg"
        };
        this.sfxMap = new Map();
        this.audioContext = new AudioContext();
    }
    playSound(path) {
    }
}
//# sourceMappingURL=AudioEngine.js.map