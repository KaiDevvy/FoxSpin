import { Entity } from "./Entity.js";
import { Input } from "./Input.js";
import { SimpleRect } from "./SimpleRect.js";
import { Vector2 } from "./Vector2.js";
import { Text } from "./Text.js";
export class Button extends Entity {
    get text() {
        return this.textDisplay.content;
    }
    set text(value) {
        this.textDisplay.content = value;
    }
    constructor() {
        super();
        this.onClick = null;
        this.width = 200;
        this.height = 50;
        Input.onMouseButton(0, this.OnClick.bind(this));
        this.background = new SimpleRect(this, new Vector2(this.width, this.height), "gray");
        this.background.depth = -1;
        this.background.pivot = new Vector2(this.width / 2, this.height / 2);
        this.textDisplay = new Text(this, "Click Me");
        this.textDisplay.fillStyle = "white";
        this.textDisplay.fontSize = 20;
    }
    update() {
        this.background.color = this.IsHover() ? "darkgray" : "gray";
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
//# sourceMappingURL=Button.js.map