import { Renderer } from "./Renderer.js";
import { Vector2 } from "./Vector2.js";
import { Scene } from "./Scene.js";
import { Camera } from "./Camera.js";
export class Window {
    constructor(canvasId) {
        Window.instance = this;
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.center = new Vector2(this.width / 2, this.height / 2);
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Failed to get 2D context");
        }
        this.ctx = context;
        window.addEventListener("resize", () => this.reloadScale());
        this.reloadScale();
        this.camera = new Camera();
        this.scene = new Scene();
    }
    update() {
        this.scene.update();
        Renderer.render(this.ctx);
    }
    reloadScale() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.center = new Vector2(this.width / 2, this.height / 2);
    }
}
//# sourceMappingURL=Window.js.map