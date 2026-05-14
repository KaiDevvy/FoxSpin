import { Drawable } from "./Drawable.js";
export class Text extends Drawable {
    constructor(owner, content) {
        super(owner);
        this.content = content;
    }
    draw(ctx) {
        ctx.font = "80px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.content, 0, 0);
    }
}
//# sourceMappingURL=Text.js.map