import { Counter } from "./Counter.js";
import { Entity } from "./Entity.js";
import { Spinner } from "./Spinner.js";
import { Washer } from "./Washer.js";

export class Scene
{
    public static current: Scene;
    private entities: Entity[] = [];

    constructor()
    {
        Scene.current = this;
        this.entities.push(new Spinner());
        this.entities.push(new Counter());
        this.entities.push(new Washer());
    }

    find(type: new () => Entity): Entity | null
    {
        return this.entities.find((e) => e instanceof type) || null;
    }

    update()
    {
        for (const entity of this.entities) {
            entity.update();
        }
    }
}