import { Vector } from "./vector";

export class Particle {
  position: Vector
  velocity: Vector
  constructor(position: Vector) {
    this.position = position;
    this.velocity = Vector.zero();
  }
}
