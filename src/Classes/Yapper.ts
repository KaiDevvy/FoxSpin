import { Entity } from "./Entity.js";
import { Fox } from "./Fox.js";
import { GameManager } from "./GameManager.js";
import { Scene } from "./Scene.js";


export class Yapper extends Entity
{
    private fox: Fox;
    private lastYap: number = 0;
    constructor()
    {
        super();

        this.fox = Scene.current.get("fox") as Fox;
    }

    update()
    {
        if (GameManager.getUpgradeCount("yapper") === 0)
            return;

        if (GameManager.time - this.lastYap > this.cooldownTime)
        {
            this.lastYap = GameManager.time;
            this.fox.applyForce((GameManager.getUpgradeCount("yapperamp")+1)*100);
        }
    }

    // Cooldown time in ms
    private get cooldownTime(): number
    {
        const upgCount = GameManager.getUpgradeCount("yapperfreq")+1;
        const upgFactor = 1.0 - (upgCount / 100);
        return (10 * upgFactor) + 0.2;
    }
}