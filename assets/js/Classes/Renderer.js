import { Drawable } from "./Drawable.js";
export class Renderer {
    static render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (const target of Drawable.all) {
            target.render(ctx);
        }
    }
}
//# sourceMappingURL=Renderer.js.map