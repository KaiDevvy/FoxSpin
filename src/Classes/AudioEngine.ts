
export class AudioEngine
{
    private FILE_MAP: { [key: string]: string } = {
        "angi": "assets/sounds/angi.ogg",
        "click": "assets/sounds/click.ogg"
    }
    private audioContext: AudioContext;
    private sfxMap: Map<string, AudioBuffer> = new Map();


    public initialize()
    {
        
        
    }

    constructor()
    {
        this.audioContext = new AudioContext();
    }

    public playSound(path: string)
    {

    }
}