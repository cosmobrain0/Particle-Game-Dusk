import { drawParticle, Particle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"
import { add, div, mul, sub, Vector } from "./vector";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const logicalWidth = 1080;
const logicalHeight = 1920;

export function transformDirection(p: Vector): Vector {
  return new Vector(p.x*canvas.width/logicalWidth, p.y*canvas.height/logicalHeight);
}

export function transformPosition(p: Vector): Vector {
  const widthScale = canvas.width / logicalWidth;
  const heightScale = canvas.height / logicalHeight;
  const scale = Math.min(widthScale, heightScale);
  const topLeft = div(sub(new Vector(canvas.width, canvas.height), mul(new Vector(logicalWidth, logicalHeight), scale)), 2);
  return add(topLeft, transformDirection(p));
}

export function inverseDirection(p: Vector): Vector {
  return new Vector(p.x*logicalWidth/canvas.width, p.y*logicalHeight/canvas.height);
}

export function inversePosition(p: Vector): Vector {
  const topLeft = transformPosition(Vector.zero());
  return inverseDirection(sub(p, topLeft));
}

const ctx = canvas.getContext("2d")!;

Dusk.initClient({
  onChange: ({ game: { particle }, yourPlayerId, action }) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(particle);
    drawParticle(particle, ctx);
  },
})
