import { Entity } from "./Entity.js";
import { Input } from "./Input.js";
import { SimpleRect } from "./SimpleRect.js";
import { Vector2 } from "./Vector2.js";
import { Text } from "./Text.js";
import { ClickArea } from "./ClickArea.js";

export class UIButton extends ClickArea
{
    private background: SimpleRect;
    private textDisplay: Text;
    
    get text(): string
    {
        return this.textDisplay.content;
    }
    set text(value: string)
    {
        this.textDisplay.content = value;
    }   

    constructor()
    {
        super();
        this.background = new SimpleRect(this, new Vector2(this.width, this.height), "gray");
        this.background.depth = -1;
        this.background.pivot = new Vector2(this.width / 2, this.height / 2);
        this.textDisplay = new Text(this, "Click Me");
        this.textDisplay.fillStyle = "white";
        this.textDisplay.fontSize = 20;
    }

    update()
    {
        this.background.size = new Vector2(this.width, this.height);
        this.background.pivot = new Vector2(this.width/2, this.height/2);
        this.background.color = this.IsHover() ? "darkgray" : "gray";
    }
}