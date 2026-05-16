import { ClickArea } from "./ClickArea.js";
import { Entity } from "./Entity.js";
import { Scene } from "./Scene.js";
import { UIButton } from "./UIButton.js";
import { Vector2 } from "./Vector2.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";


export class SwapTest extends Entity
{
    private TYPES: string[] = ["washer", "vinyl"];
    private isWasher: boolean = true;
    private buttons: UIButton[] = [];

    constructor()
    {
        super();
        for (let i = 0; i < this.TYPES.length; i++)
        {
            let type = this.TYPES[i];


            let button = new UIButton();
            button.text = type;
            button.width = 200;
            button.height = 50;
            Scene.current.addEntity("swapTestButton" + i, button);
            button.onClick = this.Swap.bind(this, type);
            this.buttons.push(button);
        }
    }

    Swap(type: string)
    {

        Scene.current.destroy("spintype");
        
        switch(type)
        {
            case "washer":
                Scene.current.addEntity("spintype", new Washer());
                break;
            case "vinyl":
                Scene.current.addEntity("spintype", new Vinyl());
                break;
            default:
                break;
        }

        this.isWasher = !this.isWasher;
    }
    
    On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        for (let i = 0; i < this.buttons.length; i++)
        {
            let button = this.buttons[i];
            let yPos = i * 50 - (50 * this.buttons.length);
            button.transform.position = new Vector2(100, (viewportHeight / 2) + yPos);
        }

    }
}