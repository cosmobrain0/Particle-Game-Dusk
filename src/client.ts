import { drawParticles, Particle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"
import { Vector } from "./vector";
import { transformDirection, transformPosition, logicalWidth, logicalHeight } from "./transforms";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;


function drawGame(particles: Particle[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    let topLeft = transformPosition(Vector.zero());
    let size = transformDirection(new Vector(logicalWidth, logicalHeight));
    ctx.beginPath();
    ctx.rect(topLeft.x, topLeft.y, size.x, size.y);
    ctx.stroke();

    drawParticles(particles, ctx);
}

Dusk.initClient({
  onChange: ({ game: { particles }, yourPlayerId, action }) => {
    drawGame(particles);
  },
})

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
