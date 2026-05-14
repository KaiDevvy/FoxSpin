import { Text } from "./Text.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";
export class Counter extends Entity {
    constructor() {
        super();
        this.display = new Text(this, "0");
        this.transform.position = new Vector2(Window.instance.width / 2, 50);
    }
    update() {
        this.display.content = GameData.spins.toString();
    }
}
//# sourceMappingURL=Counter.js.map