import { Entity } from "./Entity.js";
import { GameManager } from "./GameManager.js";
import { Input } from "./Input.js";
import { Scene } from "./Scene.js";
import { SpinnerManager } from "./SpinnerManager.js";
import { Text } from "./Text.js";
import { UIButton } from "./UIButton.js";
import { Vector2 } from "./Vector2.js";
export class DebugMenu extends Entity {
    constructor() {
        super();
        this.TYPES = ["none", "washer", "vinyl"];
        this.spinnerButtons = [];
        this.recentVelocities = [];
        this.lastRecInd = 0;
        this.enabled = true;
        for (let i = 0; i < this.TYPES.length; i++) {
            let type = this.TYPES[i];
            let button = new UIButton();
            button.text = type.charAt(0).toUpperCase() + type.slice(1);
            button.width = 200;
            button.height = 50;
            Scene.current.addEntity("DEBUG_swapto_" + type, button);
            button.onClick = SpinnerManager.forceSet.bind(SpinnerManager, type);
            this.spinnerButtons.push(button);
        }
        Input.onKeyPress.subscribe((key) => { if (key == "r")
            GameManager.WipeSave(); });
        Input.onKeyPress.subscribe((key) => { if (key == "s")
            GameManager.SaveGame(); });
        Input.onKeyPress.subscribe((key) => { if (key == "d")
            this.toggle(); });
        this.debugInfoDisplay = new Text(this, "");
        this.debugInfoDisplay.fontSize = 20;
        this.toggle();
    }
    toggle() {
        this.enabled = !this.enabled;
        for (const button of this.spinnerButtons)
            button.setVisible(this.enabled);
        this.debugInfoDisplay.enabled = this.enabled;
    }
    update() {
        if (!this.enabled)
            return;
        const fox = Scene.current.get("fox");
        if (!fox)
            return;
        this.lastRecInd = (this.lastRecInd + 1) % 20;
        this.recentVelocities[this.lastRecInd] = fox.velocity;
        let avg = this.recentVelocities.reduce((acc, num) => acc + num, 0) / this.recentVelocities.length;
        this.debugInfoDisplay.content =
            `Velocity: ${Math.floor(avg)}
ClickForce: ${fox.clickForce}
Friction: ${fox.friction}`;
    }
    On_Rescale(viewportWidth, viewportHeight, _) {
        this.transform.position = new Vector2(viewportWidth - 100, viewportHeight / 2 + 200);
        for (let i = 0; i < this.spinnerButtons.length; i++) {
            let button = this.spinnerButtons[i];
            let yPos = i * 50 - (50 * (this.spinnerButtons.length / 2));
            button.transform.position = new Vector2(viewportWidth - 100, (viewportHeight / 2) + yPos);
        }
    }
}
//# sourceMappingURL=DebugMenu.js.map