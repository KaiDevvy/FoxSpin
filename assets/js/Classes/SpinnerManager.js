import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Scene } from "./Scene.js";
import { Vinyl } from "./Vinyl.js";
import { Washer } from "./Washer.js";
export class SpinnerManager extends Entity {
    constructor() {
        super();
        this.lastSpinUnlock = GameManager.getUpgradeCount("spinner");
        SpinnerManager.set(this.lastSpinUnlock);
    }
    update() {
        if (this.lastSpinUnlock !== GameManager.getUpgradeCount("spinner")) {
            this.lastSpinUnlock = GameManager.getUpgradeCount("spinner");
            SpinnerManager.set(this.lastSpinUnlock);
        }
    }
    static set(index) {
        this.forceSet(this.spinners[index]);
    }
    static forceSet(id = "") {
        Scene.current.destroy("spinner");
        id = id.toLowerCase();
        SpinnerManager.active = null;
        switch (id) {
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
        console.log(id);
        console.log(SpinnerManager.active);
        if (SpinnerManager.active)
            Scene.current.addEntity("spinner", SpinnerManager.active);
        return SpinnerManager.active;
    }
}
SpinnerManager.spinners = ["none", "vinyl", "washer"];
SpinnerManager.active = null;
//# sourceMappingURL=SpinnerManager.js.map