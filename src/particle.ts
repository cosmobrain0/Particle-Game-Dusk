import { Vector } from "./vector";

export class Particle {
  position: Vector
  velocity: Vector
  static radius: number = 5;
  static fillStyle: string = "#fff";
  constructor(position: Vector) {
    this.position = position;
    this.velocity = Vector.zero();
  }

  update(dt: number) {
    this.position = this.position.add(this.velocity.mul(dt));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, Particle.radius, 0, 2*Math.PI);
    ctx.fillStyle = Particle.fillStyle;
    ctx.fill();
  }
}
