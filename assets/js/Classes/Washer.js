import { Entity } from "./Entity.js";
import { Scene } from "./Scene.js";
import { Spinner } from "./Spinner.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";
export class Washer extends Entity {
    constructor() {
        super();
        this.backsprite = new Sprite(this, "assets/images/washer_back.png");
        this.frontsprite = new Sprite(this, "assets/images/washer_front.png");
        this.backsprite.pivot = this.frontsprite.pivot = new Vector2(550 / 2, 750 / 2);
        this.transform.position = Window.instance.camera.center;
        this.spinner = Scene.current.find(Spinner);
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        this.transform.position = Window.instance.camera.center;
        this.transform.scale = new Vector2(1.0 * factor, 1.0 * factor);
    }
    update() {
        let factor = Math.random() * 2 - 1;
        factor *= this.spinner.velocity / 400;
        factor = Math.clamp(factor, 0, 1);
        factor = Math.pow(factor, 3);
        this.transform.rotation = factor * 0.2;
        this.transform.position = Window.instance.camera.center.add(new Vector2(factor * 3, 0));
    }
}
//# sourceMappingURL=Washer.js.map