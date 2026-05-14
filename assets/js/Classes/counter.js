import { Text } from "./Text.js";
import { Entity } from "./Entity.js";
export class Counter extends Entity {
    constructor() {
        this.display = new Text(this, "0");
    }
}
//# sourceMappingURL=counter.js.map