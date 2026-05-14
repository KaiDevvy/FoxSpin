import { Vector2 } from "./Vector2.js";

export class Input
{
    private static keys: Map<string, Set<Function>> = new Map();
    private static mouseButtons: Map<number, Set<Function>> = new Map();
    public static mousePos: Vector2 = Vector2.zero();

    public static initialize()
    {
        window.addEventListener("keydown", (event) => {
            Input.keys.get(event.key)?.forEach((fn) => fn());
        });
        
        window.addEventListener("mousemove", (event) => {
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            Input.mousePos.x = event.clientX - rect.left;
            Input.mousePos.y = event.clientY - rect.top;
        });

        window.addEventListener("mousedown", (event) => {
            Input.mouseButtons.get(event.button)?.forEach((fn) => fn());
        })
    }


    public static onMouseButton(button: number, callback: Function)
    {
        if (!Input.mouseButtons.has(button)) {
            Input.mouseButtons.set(button, new Set());
        }
        Input.mouseButtons.get(button)?.add(callback);
    }

    public static onKey(key: string, callback: Function)
    {
        if (!Input.keys.has(key)) {
            Input.keys.set(key, new Set());
        }
        Input.keys.get(key)?.add(callback);
    }

}