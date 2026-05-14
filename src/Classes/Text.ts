import { Drawable } from "./Drawable.js";
import { Entity } from "./Entity.js";


export class Text extends Drawable
{
    public content: string;

    constructor(owner:Entity, content: string)
    {
        super(owner)
        this.content = content
    }

    protected draw(ctx: CanvasRenderingContext2D): void
    {

        ctx.font = "80px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.content, 0, 0);
    }
}