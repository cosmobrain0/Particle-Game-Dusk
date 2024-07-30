import type { PlayerId, DuskClient } from "dusk-games-sdk/multiplayer"
import { Vector } from "./vector"
import { Particle, updateParticle } from "./particle"

// TODO: move game logic data here
export interface GameState {
  particle: Particle,
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
    let particle = new Particle(new Vector(2, 3));
    particle.velocity = new Vector(0.2, 0.4);
    return {
      particle,
      playerIds: allPlayerIds,
      previousGameTime: Dusk.gameTime(),
    };
  },
  actions: {
  },
  update: ({ game }) => {
    let currentFrame = Dusk.gameTime();
    let dt = currentFrame-game.previousGameTime;

    updateParticle(game.particle, dt);

    game.previousGameTime = currentFrame;
  },
  updatesPerSecond: 30,
})
