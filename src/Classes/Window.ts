import { Renderer } from "./Renderer.js";
import { Vector2 } from "./Vector2.js";
import { Scene } from "./Scene.js"; 
import { Camera } from "./Camera.js";

export class Window
{
    public static instance: Window;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public center: Vector2

    private scene: Scene;
    public camera: Camera;

    constructor(canvasId: string)
    {
        Window.instance = this;

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
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

    public update()
    {
        this.scene.update();
        Renderer.render(this.ctx);
    }

    public reloadScale()
    {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.center = new Vector2(this.width / 2, this.height / 2);
    }

}