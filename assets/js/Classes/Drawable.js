import { Vector2 } from "./Vector2.js";
export class Drawable {
    constructor(owner = null, pivot = Vector2.zero()) {
        this.enabled = true;
        this.owner = null;
        this.pivot = pivot;
        this.owner = owner;
        Drawable.all.push(this);
    }
    render(ctx) {
        if (!this.enabled || this.owner == null) {
            return;
        }
        ctx.save();
        ctx.setTransform(this.owner.transform.getWorldMatrix());
        ctx.translate(-this.pivot.x, -this.pivot.y);
        this.draw(ctx);
        ctx.restore();
    }
    dispose() {
        const index = Drawable.all.indexOf(this);
        if (index > -1) {
            Drawable.all.splice(index, 1);
        }
    }
    draw(ctx) {
    }
}
Drawable.all = [];
//# sourceMappingURL=Drawable.js.map