import { AudioEngine } from "./AudioEngine.js";
import { Counter } from "./Counter.js";
import { Entity } from "./Entity.js";
import { Spinner } from "./Spinner.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";

export class Scene
{
    public static current: Scene;
    private entities: Entity[] = [];
    private waitingForAudio: boolean = true;

    constructor()
    {
        Scene.current = this;
        this.entities.push(new Spinner());
        this.entities.push(new Counter());
        this.entities.push(new Vinyl());
    }

    find(type: new () => Entity): Entity | null
    {
        return this.entities.find((e) => e instanceof type) || null;
    }   

    update()
    {
        if (this.waitingForAudio && AudioEngine.isReady)
        {
            for (const entity of this.entities) {
                entity.On_AudioReady();
            }
            this.waitingForAudio = false;
        }

        for (const entity of this.entities) {
            entity.update();
        }
    }

    On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        for (const entity of this.entities) {
            entity.On_Rescale(viewportWidth, viewportHeight, factor);
        }
    }
}