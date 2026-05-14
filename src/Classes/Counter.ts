import { Text } from "./Text.js";
import { Spinner } from "./Spinner.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";

export class Counter extends Entity
{
    private display: Text;
    constructor()
    {
        super();
        this.display = new Text(this, "0");
    }

    public update()
    {
        this.display.content = GameData.spins.toString();
    }

    public On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        this.transform.position = new Vector2(viewportWidth / 2, viewportHeight * 0.1);
        this.display.fontSize = 80 * factor;
    }
}