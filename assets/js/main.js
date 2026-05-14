import { Window } from "./Classes/Window.js";
import "./Classes/MathExt.js";
import { Input } from "./Classes/Input.js";
const gameWindow = new Window("canvas");
window.addEventListener("load", () => {
    gameWindow.reloadScale();
    Input.initialize();
    // Begin game loop
    requestAnimationFrame(gameLoop);
});
function gameLoop(frameTime) {
    gameWindow.update();
    // Request next frame
    requestAnimationFrame(gameLoop);
}
//# sourceMappingURL=main.js.map