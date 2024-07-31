import { PlayerId } from "dusk-games-sdk"
import { add, mul, normalised, sqrLength, sub, theta, Vector } from "./vector"
import { transformPosition, transformScalar } from "./transforms";

export class Player {
  id: PlayerId
  position: Vector
  target: Vector
  colour: string
  static sideLength: number = 60;
  static speed: number = 0.2;

  constructor(id: PlayerId, position: Vector, colour: string) {
    this.id = id;
    this.position = position;
    this.target = position;
    this.colour = colour;
  }
}

export function updatePlayer(player: Player, dt: number) {
  let offset = sub(player.target, player.position);
  if (sqrLength(offset) <= Player.speed*Player.speed*dt*dt) {
    player.position = player.target;
  } else {
    player.position = add(player.position, mul(normalised(offset), Player.speed * dt));
  }
}

export const player1Colour = "rgb(66, 135, 245)";
export const player2Colour = "rgb(235, 95, 14)";

export function drawPlayer(player: Player, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = player.colour;
  let position = transformPosition(player.position);
  let sideLength = transformScalar(Player.sideLength);
  ctx.fillRect(position.x, position.y, sideLength, sideLength);
}

export function drawPlayerTarget(player: Player, ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = player.colour;
  ctx.lineWidth = 3;
  let arcRadius = transformScalar(Player.sideLength/2);
  let centrePosition = transformPosition(add(player.position, mul(Vector.one(), Player.sideLength/2)));
  let targetPosition = transformPosition(add(player.target, mul(Vector.one(), Player.sideLength/2)));
  let lineMeetsArcOffset = mul(normalised(sub(centrePosition, targetPosition)), arcRadius);
  let lineMeetsArc = add(lineMeetsArcOffset, targetPosition);
  let lineMeetsArcAngle = theta(lineMeetsArcOffset);
  ctx.beginPath();
  ctx.moveTo(centrePosition.x, centrePosition.y);
  ctx.lineTo(lineMeetsArc.x, lineMeetsArc.y);
  ctx.arc(targetPosition.x, targetPosition.y, arcRadius, lineMeetsArcAngle, lineMeetsArcAngle + 2*Math.PI);
  ctx.stroke();
}

export function pointOnPlayer(point: Vector, player: Player): boolean {
  return point.x-player.position.x == Math.min(Math.max(point.x-player.position.x, 0), Player.sideLength) &&
    point.y-player.position.y == Math.min(Math.max(point.y-player.position.y, 0), Player.sideLength);
}
