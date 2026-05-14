import { Text } from "./Text.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Vector2 } from "./Vector2.js";
export class Counter extends Entity {
    constructor() {
        super();
        this.display = new Text(this, "0");
    }
    update() {
        this.display.content = GameData.spins.toString();
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        this.transform.position = new Vector2(viewportWidth / 2, viewportHeight * 0.1);
        this.display.fontSize = 80 * factor;
    }
}
//# sourceMappingURL=Counter.js.map