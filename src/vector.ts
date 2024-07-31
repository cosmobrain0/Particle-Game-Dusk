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
}

export function length(v: Vector): number {
  return Math.sqrt(v.x*v.x + v.y*v.y);
}

export function sqrLength(v: Vector): number {
  return v.x*v.x + v.y*v.y;
}

export function theta(v: Vector): number {
  return Math.atan2(v.y, v.x);
}

export function add(v: Vector, other: Vector): Vector {
  return new Vector(v.x+other.x, v.y+other.y);
}

export function sub(v: Vector, other: Vector): Vector {
  return new Vector(v.x-other.x, v.y-other.y);
}

export function mul(v: Vector, scalar: number): Vector {
  return new Vector(v.x*scalar, v.y*scalar);
}

export function div(v: Vector, scalar: number): Vector {
  return new Vector(v.x/scalar, v.y/scalar);
}

export function polar(theta: number, magnitude: number): Vector {
  return new Vector(Math.cos(theta)*magnitude, Math.sin(theta)*magnitude);
}

export function normalised(v: Vector) {
  const l = length(v);
  return new Vector(v.x/l, v.y/l);
}

export function equals(a: Vector, b: Vector) {
  return a.x == b.x && a.y == b.y;
}
