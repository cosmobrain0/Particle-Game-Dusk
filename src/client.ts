import { drawParticle, Particle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;

Dusk.initClient({
  onChange: ({ game: { particle }, yourPlayerId, action }) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(particle);
    drawParticle(particle, ctx);
  },
})
