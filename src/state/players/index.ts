import { useSelector, useDispatch } from 'react-redux'

export interface PlayerT {
  id: string
  name: string
}

export const ADD_PLAYER = 'players/ADD_PLAYER'
export const UPDATE_PLAYER = 'players/UPDATE_PLAYER'

export const core: any = {
  [ADD_PLAYER]: (state: PlayerT[], action: any) => [...state, action.player],
  [UPDATE_PLAYER]: (state: PlayerT[], action: any) =>
    state.map((player: PlayerT) =>
      player.id === action.player.id ? action.player : player,
    ),
}

export const addPlayer = (player: PlayerT) => ({
  type: ADD_PLAYER,
  player,
})
export const updatePlayer = (player: PlayerT) => ({
  type: UPDATE_PLAYER,
  player,
})

export const upsertPlayer = (player: PlayerT) => (
  dispatch: Function,
  getState: Function,
) => {
  const state = getState().players
  console.log('STATE', state)
  if (state.map((p: PlayerT) => p.id).includes(player.id)) {
    dispatch(updatePlayer(player))
  } else {
    dispatch(addPlayer(player))
  }
}

export const usePlayers = () => {
  return useSelector((state: any) => state.players || [])
}
export const usePlayersActions = () => {
  const dispatch = useDispatch()
  return {
    addPlayer: (player: PlayerT) => dispatch(addPlayer(player)),
    updatePlayer: (player: PlayerT) => dispatch(updatePlayer(player)),
    upsertPlayer: (player: PlayerT) => dispatch(upsertPlayer(player)),
  }
}
