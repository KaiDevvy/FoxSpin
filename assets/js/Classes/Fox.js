import { AudioEngine } from "./AudioEngine.js";
import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";
import { ClickArea } from "./ClickArea.js";
import { SpinnerManager } from "./SpinnerManager.js";
export class Fox extends Entity {
    constructor() {
        super();
        this.BASE_CFORCE = 4;
        this.velocity = 0;
        this.rotation = 0;
        this.rotation = 359;
        this.clickArea = new ClickArea();
        this.clickArea.width = 512;
        this.clickArea.height = 512;
        this.clickArea.onClick = this.applyForce.bind(this, this.clickForce);
        this.clickArea.addAliasKey(" ");
        this.sprite = new Sprite(this, "assets/images/spinner.png");
        this.sprite.pivot = new Vector2(512, 512);
    }
    On_Rescale(_, __, factor) {
        this.transform.position = Window.instance.camera.center;
        this.transform.scale = new Vector2(0.5 * factor, 0.5 * factor);
        this.clickArea.transform.position = this.transform.position;
    }
    applyForce(force) {
        this.velocity += force;
    }
    update() {
        this.velocity *= this.friction; // Damping
        this.velocity = Math.max(GameManager.getUpgradeCount("minvelocity") * 0.1, this.velocity);
        this.rotation -= this.velocity;
        if (this.rotation < 0) {
            this.rotation += 360;
            if (Math.random() < 0.01) {
                AudioEngine.playOneshot("angi");
            }
            GameManager.data.spins++;
            GameManager.data.totalSpins++;
        }
        this.transform.rotation = this.rotation;
    }
    get clickForce() {
        return this.BASE_CFORCE + (20 * ((GameManager.data.upgrades["clickforce"] || 1) / 100));
    }
    get friction() {
        var _a;
        return (((_a = SpinnerManager.active) === null || _a === void 0 ? void 0 : _a.friction) || 0.97);
    }
    get maxForce() {
        // TODO: Find the common forceval formula
        return this.clickForce;
    }
}
//# sourceMappingURL=Fox.js.map