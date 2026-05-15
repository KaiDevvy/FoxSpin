import { AudioEngine } from "./AudioEngine.js";
import { ClickArea } from "./ClickArea.js";
import { Counter } from "./Counter.js";
import { Entity } from "./Entity.js";
import { Spinner } from "./Spinner.js";
import { SwapTest } from "./SwapTest.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";
import { Window } from "./Window.js";

export class Scene
{
    public static current: Scene;
    private entities: Map<string, Entity> = new Map();
    private waitingForAudio: boolean = true;

    private lastWidth: number = 0;
    private lastHeight: number = 0;
    private lastFactor: number = 1.0;

    constructor()
    {
        Scene.current = this;
        this.entities.set("spinner", new Spinner());
        this.entities.set("counter", new Counter());
        this.entities.set("washer", new Washer());
        this.entities.set("swapTest", new SwapTest());
    }

    get(entityName: string): Entity | null
    {
        return this.entities.get(entityName) || null;
    }

    update()
    {
        if (this.waitingForAudio && AudioEngine.isReady)
        {
            for (const entity of this.entities.values()) {
                entity.On_AudioReady();
            }
            this.waitingForAudio = false;
        }

        for (const entity of this.entities.values()) {
            entity.update();
        }
    }

    addEntity(name: string, entity: Entity)
    {
        this.entities.set(name, entity);
        entity.On_Rescale(this.lastWidth, this.lastHeight, this.lastFactor);
        entity.On_AudioReady();
    }


    destroy(entityName: string)
    {
        const entity = this.entities.get(entityName);
        if (entity) {
            entity.dispose();
            this.entities.delete(entityName);
        }
    }

    createDummy()
    {
        const dummy = new Entity();
        this.addEntity(crypto.randomUUID(), dummy);
        return dummy;
    }

    On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        // Store the last used dimensions and factor
        this.lastWidth = viewportWidth;
        this.lastHeight = viewportHeight;
        this.lastFactor = factor;

        for (const entity of this.entities.values()) {
            entity.On_Rescale(viewportWidth, viewportHeight, factor);
        }
    }
}