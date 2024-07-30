import type { PlayerId, DuskClient } from "dusk-games-sdk/multiplayer"
import { Vector } from "./vector"
import { Particle, updateParticle } from "./particle"
import { logicalHeight, logicalWidth } from "./transforms"

// TODO: move game logic data here
export interface GameState {
  particles: Particle[],
  playerIds: PlayerId[]
  previousGameTime: number,
}

// TODO: allow the user to have actions
type GameActions = {
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: allPlayerIds => {
    return {
      particles: new Array(100).fill(0).map(_ => new Particle(new Vector(Math.random()*logicalWidth, Math.random()*logicalHeight), 0.3)),
      playerIds: allPlayerIds,
      previousGameTime: Dusk.gameTime(),
    };
  },
  actions: {
  },
  update: ({ game }) => {
    let currentFrame = Dusk.gameTime();
    let dt = currentFrame-game.previousGameTime;

    for (let i=0; i<game.particles.length; i++)
      updateParticle(game.particles[i], dt);

    game.previousGameTime = currentFrame;
  },
  updatesPerSecond: 30,
})
