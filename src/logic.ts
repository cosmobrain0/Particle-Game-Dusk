import type { PlayerId, DuskClient } from "dusk-games-sdk/multiplayer"

// TODO: move game logic data here
export interface GameState {
  playerIds: PlayerId[]
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
  setup: (allPlayerIds) => ({
    playerIds: allPlayerIds,
  }),
  actions: {
  },
})
