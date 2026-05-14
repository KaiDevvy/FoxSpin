import { Counter } from "./Counter.js";
import { Spinner } from "./Spinner.js";
import { Washer } from "./Washer.js";
export class Scene {
    constructor() {
        this.entities = [];
        Scene.current = this;
        this.entities.push(new Spinner());
        this.entities.push(new Counter());
        this.entities.push(new Washer());
    }
    find(type) {
        return this.entities.find((e) => e instanceof type) || null;
    }
    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        for (const entity of this.entities) {
            entity.On_Rescale(viewportWidth, viewportHeight, factor);
        }
    }
}
//# sourceMappingURL=Scene.js.map