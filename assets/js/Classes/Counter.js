import { Text } from "./Text.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Vector2 } from "./Vector2.js";
import { AudioEngine } from "./AudioEngine.js";
export class Counter extends Entity {
    constructor() {
        super();
        this.lastSpins = 0;
        this.bumpFactor = 0;
        this.display = new Text(this, "0");
    }
    update() {
        if (this.lastSpins != GameData.spins) {
            AudioEngine.playOneshot("click", 0.5);
            this.lastSpins = GameData.spins;
            this.display.content = "Spins:\n" + GameData.spins.toString();
            this.bumpFactor = 1;
        }
        this.bumpFactor = Math.max(0, this.bumpFactor - 0.05);
        const factor = 1 + this.bumpFactor * 0.1;
        this.display.fontSize = factor * 80;
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        this.transform.position = new Vector2(viewportWidth / 2, viewportHeight * 0.1);
        this.display.fontSize = 80 * factor;
    }
}
//# sourceMappingURL=Counter.js.map