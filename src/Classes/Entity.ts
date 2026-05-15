import { Scene } from "./Scene.js";
import { Transform } from "./Transform.js";

export class Entity
{
    public static all: Entity[] = [];
    public transform: Transform = new Transform();
  
    public On_AudioReady()
    {

    }

    public On_Rescale(viewportWidth: number, viewportHeight: number, factor: number)
    {

    }

    public update()
    {
        
    }

    public dispose()
    {
        
    }
}