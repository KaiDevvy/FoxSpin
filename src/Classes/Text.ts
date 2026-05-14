import { Drawable } from "./Drawable.js";
import { Entity } from "./Entity.js";


export class Text extends Drawable
{
    public content: string;
    public fontSize: number = 80;
    public font: string = "Arial";
    public textAlign: CanvasTextAlign = "center";
    public textBaseline: CanvasTextBaseline = "middle";
    public fillStyle: string = "black";

    constructor(owner:Entity, content: string)
    {
        super(owner)
        this.content = content
    }

    protected draw(ctx: CanvasRenderingContext2D): void
    {

        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.content, 0, 0);
    }
}