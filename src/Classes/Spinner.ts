import { AudioEngine } from "./AudioEngine.js";
import { Entity } from "./Entity.js";
import { GameData } from "./GameData.js";
import { Input } from "./Input.js";
import { Sprite } from "./Sprite.js";
import { Text } from "./Text.js";
import { Vector2 } from "./Vector2.js";
import { Window } from "./Window.js";

export class Spinner extends Entity
{
    private sprite: Sprite;
    public velocity: number = 0;
    private rotation: number = 0;
    private pulseFactor: number = 0;

    constructor()
    {
        super();

        this.sprite = new Sprite(this, "assets/images/spinner.png");
        this.sprite.pivot = new Vector2(512, 512);
        
        Input.onMouseButton(0, () => {
            this.velocity += GameData.spinForce;
        });
    }
    
    public On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {
        this.transform.position = Window.instance.camera.center;
        this.transform.scale = new Vector2(0.5 * factor, 0.5 * factor);
    }

    public update()
    {
        this.velocity *= GameData.friction; // Damping
        this.rotation -= this.velocity;
        if (this.rotation < 0) {
            this.rotation += 360;
            this.pulseFactor = 1.0;
            if (Math.random() < 0.01) {
                AudioEngine.playOneshot("angi");
            }
            GameData.spins++;
        }
        this.transform.rotation = this.rotation;
        let pulseScale = 0.5 + Math.pow(this.velocity, 0.2) * 0.04;
        this.transform.scale.x = Math.lerp(this.transform.scale.x, pulseScale, 0.1);
        this.transform.scale.y = Math.lerp(this.transform.scale.y, pulseScale, 0.1);
        this.pulseFactor = Math.max(this.pulseFactor - 0.01, 0.0);
    }
}