import { Drawable } from "./Drawable.js";
import { Entity } from "./Entity.js";

export class Sprite extends Drawable
{
    private image: HTMLImageElement;

    constructor(owner: Entity | null, spriteID: string)
    {
        super(owner);

        this.image = new Image();
        this.image.src = spriteID;

        this.image.onerror = () => {
            console.error(`Failed to load image: ${spriteID}`);
        }
    }

    protected draw(ctx: CanvasRenderingContext2D)
    {
        if (!this.image.complete) {
            return;
        }

        ctx.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight);
    }
}