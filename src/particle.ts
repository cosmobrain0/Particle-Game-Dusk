import { logicalHeight, logicalWidth, transformPosition, transformScalar } from "./transforms";
import { add, mul, Vector } from "./vector";

export class Particle {
  position: Vector
  velocity: Vector
  static radius: number = 10;
  static fillStyle: string = "#fff";
  constructor(position: Vector) {
    this.position = position;
    this.velocity = Vector.zero();
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

export function drawParticle(p: Particle, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  let position = transformPosition(p.position);
  let radius = transformScalar(Particle.radius);
  ctx.arc(position.x, position.y, radius, 0, 2*Math.PI);
  ctx.fillStyle = Particle.fillStyle;
  ctx.fill();
}

