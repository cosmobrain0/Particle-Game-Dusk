import type { PlayerId, DuskClient } from "dusk-games-sdk/multiplayer"
import { Vector } from "./vector"
import { Particle, updateParticle } from "./particle"
import { logicalHeight, logicalWidth } from "./transforms"
import { Player, player1Colour, player2Colour, updatePlayer } from "./player"

// TODO: move game logic data here
export interface GameState {
  players: [Player, Player]
  particles: Particle[],
  playerIds: PlayerId[]
  previousGameTime: number,
}

// TODO: allow the user to have actions
type GameActions = {
  playerTarget: (target: Vector) => void;
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: allPlayerIds => {
    return {
      players: [
        new Player(allPlayerIds[0], new Vector(logicalWidth/2 - Player.sideLength/2, logicalHeight * 0.2 - Player.sideLength/2), player1Colour),
        new Player(allPlayerIds[1], new Vector(logicalWidth/2 - Player.sideLength/2, logicalHeight * 0.8 - Player.sideLength/2), player2Colour),
      ],
      particles: new Array(100).fill(0).map(_ => new Particle(new Vector(Math.random()*logicalWidth, Math.random()*logicalHeight), 0.3)),
      playerIds: allPlayerIds,
      previousGameTime: Dusk.gameTime(),
    };
  },
  actions: {
    playerTarget: (target, { game, playerId }) => {
      game.players.find(x => x.id == playerId)!.target = target;
    }
  },
  update: ({ game }) => {
    let currentFrame = Dusk.gameTime();
    let dt = currentFrame-game.previousGameTime;

    for (let i=0; i<game.players.length; i++)
      updatePlayer(game.players[i], dt);

    for (let i=0; i<game.particles.length; i++)
      updateParticle(game.particles[i], dt);

    game.previousGameTime = currentFrame;
  },
  updatesPerSecond: 30,
})
