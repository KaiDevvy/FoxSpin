import { Text } from "./Text.js";
import { Spinner } from "./Spinner.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";
import { AudioEngine } from "./AudioEngine.js";

export class Counter extends Entity
{
    private display: Text;
    private lastSpins: number = 0;
    private bumpFactor: number = 0;
    constructor()
    {
        super();
        this.display = new Text(this, "0");
    }

    public update()
    {
        if (this.lastSpins !=  GameData.spins)
        {
            AudioEngine.playOneshot("click", 0.5);
            this.lastSpins = GameData.spins;
            this.display.content = "Spins:\n" + GameData.spins.toString();
            this.bumpFactor = 1;
        }

        this.bumpFactor = Math.max(0, this.bumpFactor - 0.05);
        const factor = 1 + this.bumpFactor * 0.1;
        this.display.fontSize = factor * 80;
    }

    public On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        this.transform.position = new Vector2(viewportWidth / 2, viewportHeight * 0.1);
        this.display.fontSize = 80 * factor;
    }
}