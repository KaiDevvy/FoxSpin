import { AudioEngine } from "./AudioEngine.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Scene } from "./Scene.js";
import { Spinner } from "./Spinner.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";

export class Washer extends Entity
{
    private backsprite: Sprite;
    private frontsprite: Sprite;
    private spinner: Spinner;
    private washerSound: AudioBufferSourceNode | null = null;
    private washerGain: GainNode | null = null;
    constructor()
    {
        super();
        this.backsprite = new Sprite(this, "assets/images/washer_back.png");
        this.frontsprite = new Sprite(this, "assets/images/washer_front.png");
        this.backsprite.pivot = this.frontsprite.pivot = new Vector2(550/2, 750/2);
        this.transform.position = Window.instance.camera.center;

        this.spinner = Scene.current.find(Spinner) as Spinner;
    }
    
    On_AudioReady()
    {
        const washerAudio = AudioEngine.playSound("washer", 1.0, true);
        if (!washerAudio) {
            console.warn("Failed to play washer sound.");
            return;
        }
        this.washerSound = washerAudio[0] as AudioBufferSourceNode;
        this.washerGain = washerAudio[1] as GainNode;
    }

    On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        this.transform.position = Window.instance.camera.center;
        this.transform.scale = new Vector2(1.0 * factor, 1.0 * factor);
    }

    update()
    {
        let randomVal = Math.random() * 2 - 1;
        const factor = Math.clamp(this.spinner.velocity / GameData.spinForce*4,0,1);
        randomVal *= factor;
        randomVal = Math.clamp(randomVal, -1, 1);
        randomVal = Math.pow(randomVal, 3);
        this.transform.rotation = randomVal * 0.2;
        this.transform.position = Window.instance.camera.center.add(new Vector2(randomVal*3, 0));
        if (this.washerGain) {
            this.washerGain.gain.value = factor*0.1;
        }
    }

    dispose()
    {
        if (this.washerSound) {
            this.washerSound.stop();
            this.washerSound.disconnect();
        }
        if (this.washerGain) {
            this.washerGain.disconnect();
        }
        this.backsprite.dispose();
        this.frontsprite.dispose();
    }
}