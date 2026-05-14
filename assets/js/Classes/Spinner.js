import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Input } from "./Input.js";
import { Sprite } from "./Sprite.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";
export class Spinner extends Entity {
    constructor() {
        super();
        this.velocity = 0;
        this.rotation = 0;
        this.pulseFactor = 0;
        this.spins = 0;
        this.sprite = new Sprite(this, "assets/images/spinner.png");
        this.transform.position = Window.instance.camera.center;
        this.sprite.pivot = new Vector2(512, 512);
        this.transform.scale = new Vector2(0.4, 0.4);
        Input.onMouseButton(0, () => {
            this.velocity += 400;
        });
    }
    update() {
        this.velocity *= 0.98; // Damping
        this.rotation -= this.velocity * 0.01;
        if (this.rotation < 0) {
            this.rotation += 360;
            this.pulseFactor = 1.0;
            GameData.spins++;
        }
        this.transform.rotation = this.rotation;
        let pulseScale = 0.5 + Math.pow(this.velocity, 0.2) * 0.04;
        this.transform.scale.x = Math.lerp(this.transform.scale.x, pulseScale, 0.1);
        this.transform.scale.y = Math.lerp(this.transform.scale.y, pulseScale, 0.1);
        this.pulseFactor = Math.max(this.pulseFactor - 0.01, 0.0);
    }
}
//# sourceMappingURL=Spinner.js.map