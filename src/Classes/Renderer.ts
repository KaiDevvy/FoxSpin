import { Drawable } from "./Drawable.js";
import { Window } from "./Window.js";

export class Renderer
{
    public static render(ctx: CanvasRenderingContext2D)
    {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        
        for (const target of Drawable.all) {
            target.render(ctx);
        }
        
    }
}