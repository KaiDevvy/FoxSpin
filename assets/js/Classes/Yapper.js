import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Scene } from "./Scene.js";
export class Yapper extends Entity {
    constructor() {
        super();
        this.lastYap = 0;
        this.fox = Scene.current.get("fox");
    }
    update() {
        if (GameManager.getUpgradeCount("yapper") === 0)
            return;
        if (GameManager.time - this.lastYap > this.cooldownTime) {
            this.lastYap = GameManager.time;
            this.fox.applyForce((GameManager.getUpgradeCount("yapperamp") + 1) * 100);
        }
    }
    // Cooldown time in ms
    get cooldownTime() {
        const upgCount = GameManager.getUpgradeCount("yapperfreq") + 1;
        const upgFactor = 1.0 - (upgCount / 100);
        return (10 * upgFactor) + 0.2;
    }
}
//# sourceMappingURL=Yapper.js.map