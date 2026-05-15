
export class AudioEngine
{
    private static FILE_MAP: { [key: string]: string } = {
        "angi": "assets/sounds/angi.ogg",
        "click": "assets/sounds/click.ogg",
        "washer": "assets/sounds/washer_loop.ogg",
        "vinyl": "assets/sounds/vinyl.ogg",
    }
    private static audioContext: AudioContext;
    private static sfxMap: Map<string, AudioBuffer> = new Map();
    private static ready: boolean = false;

    static get isReady() {
        return AudioEngine.ready;
    }

    public static initialize()
    {
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

    public static playOneshot(path: string, volume: number = 1.0)
    {
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

    public static playSound(path: string, volume: number = 1.0, looping = false) : AudioNode[] | null
    {
        if (!this.ready)
        {
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