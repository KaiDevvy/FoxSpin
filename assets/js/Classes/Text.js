import { Drawable } from "./Drawable.js";
export class Text extends Drawable {
    constructor(owner, content) {
        super(owner);
        this.fontSize = 80;
        this.font = "Arial";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.fillStyle = "black";
        this.content = content;
    }
    draw(ctx) {
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.content, 0, 0);
    }
}
//# sourceMappingURL=Text.js.map