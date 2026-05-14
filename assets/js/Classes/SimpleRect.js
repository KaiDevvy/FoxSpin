import { Drawable } from "./Drawable.js";
import { Vector2 } from "./Vector2.js";
export class SimpleRect extends Drawable {
    constructor(owner, size, color = "black") {
        super(owner, Vector2.zero());
        this.color = color;
        this.size = size;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.size.x, this.size.y);
    }
}
//# sourceMappingURL=SimpleRect.js.map