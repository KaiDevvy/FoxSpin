import { Drawable } from "./Drawable.js";
export class Sprite extends Drawable {
    constructor(owner, spriteID) {
        super(owner);
        this.image = new Image();
        this.image.src = spriteID;
        this.image.onerror = () => {
            console.error(`Failed to load image: ${spriteID}`);
        };
    }
    draw(ctx) {
        if (!this.image.complete) {
            return;
        }
        ctx.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight);
    }
}
//# sourceMappingURL=Sprite.js.map