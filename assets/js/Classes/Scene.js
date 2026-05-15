import { AudioEngine } from "./AudioEngine.js";
import { Counter } from "./Counter.js";
import { Entity } from "./Entity.js";
import { Spinner } from "./Spinner.js";
import { SwapTest } from "./SwapTest.js";
import { Washer } from "./Washer.js";
export class Scene {
    constructor() {
        this.entities = new Map();
        this.waitingForAudio = true;
        this.lastWidth = 0;
        this.lastHeight = 0;
        this.lastFactor = 1.0;
        Scene.current = this;
        this.entities.set("spinner", new Spinner());
        this.entities.set("counter", new Counter());
        this.entities.set("washer", new Washer());
        this.entities.set("swapTest", new SwapTest());
    }
    get(entityName) {
        return this.entities.get(entityName) || null;
    }
    update() {
        if (this.waitingForAudio && AudioEngine.isReady) {
            for (const entity of this.entities.values()) {
                entity.On_AudioReady();
            }
            this.waitingForAudio = false;
        }
        for (const entity of this.entities.values()) {
            entity.update();
        }
    }
    addEntity(name, entity) {
        this.entities.set(name, entity);
        entity.On_Rescale(this.lastWidth, this.lastHeight, this.lastFactor);
        entity.On_AudioReady();
    }
    destroy(entityName) {
        const entity = this.entities.get(entityName);
        if (entity) {
            entity.dispose();
            this.entities.delete(entityName);
        }
    }
    createDummy() {
        const dummy = new Entity();
        this.addEntity(crypto.randomUUID(), dummy);
        return dummy;
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        // Store the last used dimensions and factor
        this.lastWidth = viewportWidth;
        this.lastHeight = viewportHeight;
        this.lastFactor = factor;
        for (const entity of this.entities.values()) {
            entity.On_Rescale(viewportWidth, viewportHeight, factor);
        }
    }
}
//# sourceMappingURL=Scene.js.map