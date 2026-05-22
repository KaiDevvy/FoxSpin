import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Scene } from "./Scene.js";
import { UIButton } from "./UIButton.js";
import { Vector2 } from "./Vector2.js";
import { upgrades } from "../upgrades.js"
import { Window } from "./Window.js";


export class UpgradeManager extends Entity
{
    private buttons: UIButton[] = []
    private lastCount: number = 0;
 
    constructor()
    {
        super();
        this.rebuildButtons();
    }

    rebuildButtons()
    {
        for (const button of this.buttons)
        {
            Scene.current.destroy(button.id);
        }
        this.buttons = [];

        for (const id of Object.keys(upgrades))
        {
            const data = upgrades[id];

            if (data.totalSpinsRequired > GameManager.data.totalSpins)
                continue;
            
            let count = GameManager.data.upgrades[id] || 0;
            if (!data.showAfterComplete && count >= data.max)
                continue;

            let depBlock: boolean = false;
            for(const depId of data.dependencies)
            {
                const value = GameManager.data.upgrades[depId];
                if (!value || value === 0)
                {
                    depBlock = true;
                    break;
                }
            }
            
            if (depBlock)
                continue;

            let cost: number = data.baseCost;
            if (count != 0)
                cost *= data.costMultiplier * count;
            cost = Math.floor(cost);

            let button = new UIButton();
            button.text = data.displayName + ": " + cost;
            button.width = 400
            button.height = 50
            button.isDisabled = GameManager.data.spins < cost || data.max < count;
            button.onClick = () => 
            {
                GameManager.data.spins -= cost;
                if (!GameManager.data.upgrades[id])
                    GameManager.data.upgrades[id] = 0;
                GameManager.data.upgrades[id]++;
            };
            Scene.current.addEntity("upgbtn_" + id, button);
            this.buttons.push(button);
        }
    }

    update()
    {
        if(this.lastCount !== GameManager.data.spins)
        {
            this.lastCount = GameManager.data.spins;
            this.rebuildButtons();
        }
        this.On_Rescale(Window.instance.canvas.width, Window.instance.canvas.height, 1);
    }

    On_Rescale(_: number, viewportHeight: number, __: number)
    {
        for (let i = 0; i < this.buttons.length;i++)
        {
            let button = this.buttons[i];
            let yPos = i * 50 - (50 * (this.buttons.length/2));
            button.transform.position = new Vector2(100, (viewportHeight / 2) + yPos);
        }
    }
}