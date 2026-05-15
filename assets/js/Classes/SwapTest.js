import { Entity } from "./Entity.js";
import { Scene } from "./Scene.js";
import { UIButton } from "./UIButton.js";
import { Vector2 } from "./Vector2.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";
export class SwapTest extends Entity {
    constructor() {
        super();
        this.isWasher = true;
        this.button = new UIButton();
        this.button.text = "Swap Test";
        this.button.width = 200;
        this.button.height = 50;
        Scene.current.addEntity("swapTestButton", this.button);
        this.button.onClick = this.Swap.bind(this);
    }
    Swap() {
        Scene.current.destroy(this.isWasher ? "washer" : "vinyl");
        if (this.isWasher)
            Scene.current.addEntity("vinyl", new Vinyl());
        else
            Scene.current.addEntity("washer", new Washer());
        this.isWasher = !this.isWasher;
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        this.button.transform.position = new Vector2(100, viewportHeight / 2);
    }
}
//# sourceMappingURL=SwapTest.js.map