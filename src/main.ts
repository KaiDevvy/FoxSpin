
import { Window } from "./Classes/Window.js";
import "./Classes/MathExt.js";

import { Input } from "./Classes/Input.js";
import { AudioEngine } from "./Classes/AudioEngine.js";

const gameWindow = new Window("canvas");




window.addEventListener("load", () => {
    gameWindow.reloadScale();
    Input.initialize();
    Input.onMouseButton(0, () => {AudioEngine.initialize();});
    // Begin game loop
    requestAnimationFrame(gameLoop);
})


function gameLoop(frameTime: number)
{
    gameWindow.update();
    // Request next frame
    requestAnimationFrame(gameLoop);
}
