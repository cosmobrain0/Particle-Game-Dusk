import { logicalHeight, logicalWidth, transformPosition, transformScalar } from "./transforms";
import { add, mul, polar, Vector } from "./vector";

export class Particle {
  position: Vector
  velocity: Vector
  static radius: number = 10;
  static fillStyle: string = "#fff";
  constructor(position: Vector, speed: number) {
    this.position = position;
    this.velocity = polar(Math.random()*2*Math.PI, speed);
  }
}

export function updateParticle(p: Particle, dt: number) {
  p.position = add(p.position, mul(p.velocity, dt));

  if (p.position.x < 0) p.velocity.x = Math.abs(p.velocity.x);
  if (p.position.x > logicalWidth) p.velocity.x = -Math.abs(p.velocity.x);
  if (p.position.y < 0) p.velocity.y = Math.abs(p.velocity.y);
  if (p.position.y > logicalHeight) p.velocity.y = -Math.abs(p.velocity.y);

  p.position.x = Math.min(Math.max(p.position.x, 0), logicalWidth);
  p.position.y = Math.min(Math.max(p.position.y, 0), logicalHeight);
}

export function drawParticles(p: Particle[], ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = Particle.fillStyle;
  ctx.strokeStyle = "#000";
  let radius = transformScalar(Particle.radius);

  ctx.beginPath();

  for (let i=0; i<p.length; i++) {
    let position = transformPosition(p[i].position);
    ctx.moveTo(position.x, position.y);
    ctx.arc(position.x, position.y, radius, 0, 2*Math.PI);
  }

  ctx.fill();
}

