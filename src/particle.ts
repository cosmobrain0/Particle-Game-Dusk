import { add, mul, Vector } from "./vector";

export class Particle {
  position: Vector
  velocity: Vector
  static radius: number = 5;
  static fillStyle: string = "#fff";
  constructor(position: Vector) {
    this.position = position;
    this.velocity = Vector.zero();
  }
}

export function updateParticle(p: Particle, dt: number) {
  p.position = add(p.position, mul(p.velocity, dt));
}

export function drawParticle(p: Particle, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.arc(p.position.x, p.position.y, Particle.radius, 0, 2*Math.PI);
  ctx.fillStyle = Particle.fillStyle;
  ctx.fill();
}

