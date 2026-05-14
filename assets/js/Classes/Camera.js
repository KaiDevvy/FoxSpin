import { Window } from "./Window.js";
import { Vector2 } from "./Vector2.js";
// Camera represents what part of the world is currently visible on the screen.
export class Camera {
    get center() {
        return new Vector2(Window.instance.width / 2, Window.instance.height / 2);
    }
    constructor(position = Vector2.zero(), viewportSize = new Vector2(1920, 1080)) {
        this.position = position;
        this.viewportSize = viewportSize;
    }
}
//# sourceMappingURL=Camera.js.map