export class AudioEngine {
    static get isReady() {
        return AudioEngine.ready;
    }
    static initialize() {
        if (this.ready)
            return;
        this.audioContext = new AudioContext();
        const promises = Object.keys(this.FILE_MAP).map((key) => {
            const path = this.FILE_MAP[key];
            return fetch(path)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                this.sfxMap.set(key, audioBuffer);
            })
                .catch(error => {
                console.error(`Failed to load sound ${key} from ${path}:`, error);
            });
        });
        Promise.all(promises).then(() => {
            this.ready = true;
            console.log("AudioEngine initialized, all sounds loaded.");
        });
    }
    static playOneshot(path, volume = 1.0) {
        if (!this.ready) {
            console.warn("AudioEngine not ready.");
            return;
        }
        const audioBuffer = this.sfxMap.get(path);
        if (!audioBuffer) {
            console.warn(`Sound ${path} not found.`);
            return;
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start(0);
    }
    static playSound(path, volume = 1.0, looping = false) {
        if (!this.ready) {
            console.warn("AudioEngine not ready: " + path);
            return null;
        }
        const audioBuffer = this.sfxMap.get(path);
        if (!audioBuffer) {
            console.warn(`Sound ${path} not found.`);
            return null;
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = looping;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start(0);
        return [source, gainNode];
    }
}
AudioEngine.FILE_MAP = {
    "angi": "assets/sounds/angi.ogg",
    "click": "assets/sounds/click.ogg",
    "washer": "assets/sounds/washer_loop.ogg"
};
AudioEngine.sfxMap = new Map();
AudioEngine.ready = false;
//# sourceMappingURL=AudioEngine.js.map