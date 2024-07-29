import type { PlayerId, DuskClient } from "dusk-games-sdk/multiplayer"

export interface GameState {
  playerIds: PlayerId[]
}

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
