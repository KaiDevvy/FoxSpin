import { AudioEngine } from "./AudioEngine.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Scene } from "./Scene.js";
import { Spinner } from "./Spinner.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";

export class Vinyl extends Entity
{
    private backsprite: Sprite;
    private frontsprite: Sprite;
    private spinner: Spinner;
    private vinylSound: AudioBufferSourceNode | null = null;
    private vinylGain: GainNode | null = null;
    private vinylFactorSlow: number=0;
    constructor()
    {
        super();
        this.backsprite = new Sprite(this, "assets/images/vinyl_back.png");
        this.backsprite.depth = -1;
        this.frontsprite = new Sprite(this, "assets/images/vinyl_front.png");
        this.backsprite.pivot = this.frontsprite.pivot = new Vector2(213, 209);
        this.transform.position = Window.instance.camera.center;

        this.spinner = Scene.current.find(Spinner) as Spinner;
    }
    
    On_AudioReady()
    {
        const vinylAudio = AudioEngine.playSound("vinyl", 1.0, true);
        if (!vinylAudio) {
            console.warn("Failed to play vinyl sound.");
            return;
        }
        this.vinylSound = vinylAudio[0] as AudioBufferSourceNode;
        this.vinylGain = vinylAudio[1] as GainNode;
    }

    On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        this.transform.position = Window.instance.camera.center;
        this.transform.scale = new Vector2(1.1 * factor, 1.1 * factor);
    }

    update()
    {
        let randomVal = Math.random() * 2 - 1;
        const factor = Math.clamp(this.spinner.velocity / (GameData.spinForce),0,1);
        this.vinylFactorSlow = Math.lerp(this.vinylFactorSlow, factor, 0.01);
        randomVal *= factor;
        randomVal = Math.clamp(randomVal, -1, 1);
        randomVal = Math.pow(randomVal, 3);
        this.transform.rotation = randomVal * 0.05;
        this.transform.position = Window.instance.camera.center.add(new Vector2(randomVal*1, 0));
        if (this.vinylSound && this.vinylGain) {
            this.vinylSound.playbackRate.value = this.vinylFactorSlow;
            this.vinylGain.gain.value = this.vinylFactorSlow*0.2;
        }
    }

    dispose()
    {
        if (this.vinylSound) {
            this.vinylSound.stop();
            this.vinylSound.disconnect();
        }
        if (this.vinylGain) {
            this.vinylGain.disconnect();
        }
        this.backsprite.dispose();
        this.frontsprite.dispose();
    }
}