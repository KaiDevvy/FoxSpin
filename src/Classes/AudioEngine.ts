
export class AudioEngine
{
    private audioContext: AudioContext;
    private sfxMap: Map<string, AudioBuffer> = new Map();


    public initialize()
    {
        // Read the assets/sounds/ dir and load all .ogg files into sfxMap
        
        
    }

    constructor()
    {
        this.audioContext = new AudioContext();
    }

    public playSound(path: string)
    {

    }
}