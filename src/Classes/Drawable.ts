import { Entity } from "./Entity.js";
import { Renderer } from "./Renderer.js";
import { Vector2 } from "./Vector2.js";

export class Drawable
{
    public static all: Drawable[] = [];
    public depth: number = 0;
    public enabled: boolean = true;
    public owner: Entity | null = null;
    public pivot: Vector2;

    constructor(owner: Entity | null = null, pivot: Vector2 = Vector2.zero())
    {
        this.pivot = pivot;
        this.owner = owner;

        Drawable.all.push(this);
    }

    public render(ctx: CanvasRenderingContext2D)
    {
        if (!this.enabled || this.owner == null)
        {
            return;
        }

        ctx.save();
        ctx.setTransform(this.owner.transform.getWorldMatrix());
        ctx.translate(-this.pivot.x, -this.pivot.y);
        this.draw(ctx);
        ctx.restore();
    }

    public dispose()
    {
        const index = Drawable.all.indexOf(this);
        if (index > -1) {
            Drawable.all.splice(index, 1);
        }
    }

    protected draw(ctx: CanvasRenderingContext2D)
    {
        
    }
}