import { useSelector, useDispatch } from 'react-redux'
import { PlayerT } from '../players'
import { DeckT } from '../decks'

export interface EntryT {
  id: string
  playerId: string
  deckId: string
}
export interface PopulatedEntryT {
  id: string
  player: PlayerT
  deck: DeckT
}

export const ADD_ENTRY = 'staging/ADD_PLAYER'
export const REMOVE_ENTRY = 'players/REMOVE_ENTRY'

export const core: any = {
  [ADD_ENTRY]: (state: EntryT[], action: any) => [...state, action.entry],
  [REMOVE_ENTRY]: (state: EntryT[], action: any) =>
    state.filter((entry: EntryT) => entry.id !== action.entryId),
}

export const addEntry = (entry: EntryT) => ({
  type: ADD_ENTRY,
  entry,
})
export const removeEntry = (entryId: string) => ({
  type: REMOVE_ENTRY,
  entryId,
})

export const useStaging = () => {
  return useSelector((state: any) => state.staging)
}
export const usePopulatedStaging = () => {
  return useSelector((state: any) => {
    return state.staging.map((entry: EntryT) => {
      const pE: PopulatedEntryT = {
        id: entry.id,
        player: state.players.find((p: PlayerT) => p.id === entry.playerId),
        deck: state.decks.find((d: DeckT) => d.id === entry.deckId),
      }
      return pE
    })
  })
}
export const useStagingActions = () => {
  const dispatch = useDispatch()
  return {
    addEntry: (entry: EntryT) => dispatch(addEntry(entry)),
    removeEntry: (entryId: string) => dispatch(removeEntry(entryId)),
  }
}
