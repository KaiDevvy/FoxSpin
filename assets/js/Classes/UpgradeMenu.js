import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Scene } from "./Scene.js";
import { UIButton } from "./UIButton.js";
import { Vector2 } from "./Vector2.js";
export class UpgradeManager extends Entity {
    constructor() {
        super();
        this.buttons = [];
        this.fricCost = 2;
        let fricButton = new UIButton();
        fricButton.text = "[5] Reduce Friction";
        fricButton.width = 400;
        fricButton.height = 100;
        fricButton.onClick = () => {
            if (GameData.spins >= this.fricCost) {
                GameData.spins -= 5;
                GameData.upgrades.frictionDown++;
                if (GameData.upgrades.frictionDown >= 50) {
                    fricButton.isDisabled = true;
                    return;
                }
                this.fricCost = (GameData.upgrades.frictionDown + 1) * 5 * 0.5;
                this.fricCost = Math.floor(this.fricCost);
                fricButton.text = `[${this.fricCost}] Reduce Friction`;
            }
        };
        Scene.current.addEntity("upgradefric", fricButton);
        this.buttons.push(fricButton);
    }
    On_Rescale(viewportWidth, viewportHeight, factor) {
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            let yPos = i * 100 - (100 * (this.buttons.length / 2));
            button.transform.position = new Vector2(100, (viewportHeight / 2) + yPos);
        }
    }
}
//# sourceMappingURL=UpgradeMenu.js.map