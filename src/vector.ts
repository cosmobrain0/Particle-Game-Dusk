export class Vector {
  x: number;
  y: number;
  constructor(x: number | undefined, y: number | undefined) {
    if (typeof(x) == 'number' && typeof(y) == 'number') {
      this.x = x;
      this.y = y;
    } else {
      this.x = this.y = 0;
    }
  }

  static zero(): Vector {
    return new Vector(0, 0);
  }

  static one(): Vector {
    return new Vector(1, 1);
  }

  static unitX(): Vector {
    return new Vector(1, 0);
  }

  static unitY(): Vector {
    return new Vector(0, 1);
  }

  length(): number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  sqrLength(): number {
    return this.x*this.x + this.y*this.y;
  }

  add(other: Vector): Vector {
    return new Vector(this.x+other.x, this.y+other.y);
  }

  mul(scalar: number): Vector {
    return new Vector(this.x*scalar, this.y*scalar);
  }
}
