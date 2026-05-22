import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Scene } from "./Scene.js";
import { Spinner } from "./Spinner.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";


export class SpinnerManager extends Entity
{ 
    private static spinners: string[] = ["none", "vinyl", "washer"];
    private lastSpinUnlock: number;
    constructor()
    {
        super();
        this.lastSpinUnlock = GameManager.getUpgradeCount("spinner");
        SpinnerManager.set(this.lastSpinUnlock);
    }

    update()
    {
        if (this.lastSpinUnlock !== GameManager.getUpgradeCount("spinner"))
        {
            this.lastSpinUnlock = GameManager.getUpgradeCount("spinner");
            SpinnerManager.set(this.lastSpinUnlock);
        }
    }

    public static active: Spinner | null = null;

    public static set(index: number)
    {
        this.forceSet(this.spinners[index]);
    }

    public static forceSet(id: string = "") : Spinner | null
    {
        Scene.current.destroy("spinner");
        
        id = id.toLowerCase();
        SpinnerManager.active = null;
        switch(id)
        {
            case "washer":
                SpinnerManager.active = new Washer();
                break;
            case "vinyl":
                SpinnerManager.active = new Vinyl();
                break;
            default:
                // Do nothing
                break;
        }
        console.log(id)
        console.log(SpinnerManager.active)

        if (SpinnerManager.active)
            Scene.current.addEntity("spinner", SpinnerManager.active);

        return SpinnerManager.active;
    }
} 