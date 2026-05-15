import { Entity } from "./Entity.js";
import { Input } from "./Input.js";
export class ClickArea extends Entity {
    constructor() {
        super();
        this.onClick = null;
        this.width = 100;
        this.height = 100;
        Input.onMouseButton(0, this.OnClick.bind(this));
    }
    OnClick() {
        if (!this.IsHover())
            return;
        if (this.onClick) {
            this.onClick();
        }
    }
    IsHover() {
        const mousePos = Input.mousePos;
        const left = this.transform.position.x - this.width / 2;
        const right = this.transform.position.x + this.width / 2;
        const top = this.transform.position.y - this.height / 2;
        const bottom = this.transform.position.y + this.height / 2;
        return mousePos.x >= left &&
            mousePos.x <= right &&
            mousePos.y >= top &&
            mousePos.y <= bottom;
    }
}
//# sourceMappingURL=ClickArea.js.map