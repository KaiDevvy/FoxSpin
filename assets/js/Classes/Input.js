import { Vector2 } from "./Vector2.js";
export class Input {
    static initialize() {
        window.addEventListener("keydown", (event) => {
            var _a;
            (_a = Input.keys.get(event.key)) === null || _a === void 0 ? void 0 : _a.forEach((fn) => fn());
        });
        window.addEventListener("mousemove", (event) => {
            const rect = event.target.getBoundingClientRect();
            Input.mousePos.x = event.clientX - rect.left;
            Input.mousePos.y = event.clientY - rect.top;
        });
        window.addEventListener("mousedown", (event) => {
            var _a;
            (_a = Input.mouseButtons.get(event.button)) === null || _a === void 0 ? void 0 : _a.forEach((fn) => fn());
        });
        window.addEventListener("touchend", (event) => {
            var _a;
            (_a = Input.mouseButtons.get(0)) === null || _a === void 0 ? void 0 : _a.forEach((fn) => fn());
        });
    }
    static onMouseButton(button, callback) {
        var _a;
        if (!Input.mouseButtons.has(button)) {
            Input.mouseButtons.set(button, new Set());
        }
        (_a = Input.mouseButtons.get(button)) === null || _a === void 0 ? void 0 : _a.add(callback);
    }
    static onKey(key, callback) {
        var _a;
        if (!Input.keys.has(key)) {
            Input.keys.set(key, new Set());
        }
        (_a = Input.keys.get(key)) === null || _a === void 0 ? void 0 : _a.add(callback);
    }
}
Input.keys = new Map();
Input.mouseButtons = new Map();
Input.mousePos = Vector2.zero();
//# sourceMappingURL=Input.js.map