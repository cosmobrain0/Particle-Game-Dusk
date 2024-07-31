import { drawParticles, Particle, updateParticle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"
import { equals, Vector } from "./vector";
import { transformDirection, transformPosition, logicalWidth, logicalHeight, inversePosition } from "./transforms";
import { drawPlayer, drawPlayerTarget, Player, updatePlayer, } from "./player";
import { GameState } from "./logic";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;

let savedGame: GameState | null = null;
let playerId: string | undefined = undefined;
function update(game: GameState | null) {
  if (game == null) return;
  let currentFrame = Dusk.gameTime();
  let dt = currentFrame-game.previousGameTime;

  for (let i=0; i<game.players.length; i++)
    updatePlayer(game.players[i], dt);

  for (let i=0; i<game.particles.length; i++)
    updateParticle(game.particles[i], dt);

  game.previousGameTime = currentFrame;
  drawGame(game.particles, game.players, playerId);
}

setInterval(update, 1000/60);


function drawGame(particles: Particle[], players: Player[], playerId: string | undefined) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    let topLeft = transformPosition(Vector.zero());
    let size = transformDirection(new Vector(logicalWidth, logicalHeight));
    ctx.beginPath();
    ctx.rect(topLeft.x, topLeft.y, size.x, size.y);
    ctx.stroke();

    drawParticles(particles, ctx);

    for (let i=0; i<players.length; i++) {
      if (!equals(players[i].position, players[i].target) && playerId == players[i].id)
        drawPlayerTarget(players[i], ctx);
    }
    for (let i=0; i<players.length; i++) {
      drawPlayer(players[i], ctx);
    }
}

Dusk.initClient({
  onChange: ({ game, yourPlayerId, action }) => {
    savedGame = game; 
    playerId = yourPlayerId;
    drawGame(game.particles, game.players, yourPlayerId);
  },
})

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("touchstart", e => {
  // TODO: first changed touch
  if (e.changedTouches.length > 0) {
    let target = inversePosition(new Vector(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
    Dusk.actions.playerTarget(target);
  }
});

window.addEventListener("mousedown", e => {
  // TODO: first changed touch
  let target = inversePosition(new Vector(e.clientX, e.clientY));
  Dusk.actions.playerTarget(target);
});

