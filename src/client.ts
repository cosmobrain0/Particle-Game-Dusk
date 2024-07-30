import { drawParticle, Particle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"
import { add, div, mul, sub, Vector } from "./vector";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const logicalWidth = 1080;
const logicalHeight = 1920;

export function transformScalar(n: number): number {
  const widthScale = canvas.width / logicalWidth;
  const heightScale = canvas.height / logicalHeight;
  const scale = Math.min(widthScale, heightScale);
  return n * scale;
}

export function transformDirection(p: Vector): Vector {
  const scale = transformScalar(1);
  return new Vector(p.x * scale, p.y * scale);
}

export function transformPosition(p: Vector): Vector {
  const scale = transformScalar(1);
  const topLeft = div(sub(new Vector(canvas.width, canvas.height), mul(new Vector(logicalWidth, logicalHeight), scale)), 2);
  return add(topLeft, transformDirection(p));
}

export function inverseScalar(n: number): number {
  const widthScale = logicalWidth / canvas.width;
  const heightScale = logicalHeight / canvas.height;
  const scale = Math.max(widthScale, heightScale);
  return n * scale;
}

export function inverseDirection(p: Vector): Vector {
  const scale = inverseScalar(1);
  return new Vector(p.x * scale, p.y * scale);
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
