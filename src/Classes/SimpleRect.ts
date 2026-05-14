import { Drawable } from "./Drawable.js";
import { Entity } from "./Entity.js";
import { Vector2 } from "./Vector2.js";


export class SimpleRect extends Drawable
{
    public color: string;
    public size: Vector2;

    constructor(owner: Entity | null, size: Vector2, color: string = "black")
    {
        super(owner, Vector2.zero());
        this.color = color;
        this.size = size;
    }

    protected draw(ctx: CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.size.x, this.size.y);
    }
    
}