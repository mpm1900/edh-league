import { useDispatch, useSelector } from 'react-redux'

export interface DeckT {
  id: string
  name: string
  userId: string
  commanders: any[]
  url?: string
}

export const ADD_DECK = 'decks/ADD_DECK'
export const UPDATE_DECK = 'decks/UPDATE_DECK'

export const core: any = {
  [ADD_DECK]: (state: DeckT[], action: any) => [...state, action.deck],
  [UPDATE_DECK]: (state: DeckT[], action: any) =>
    state.map((deck: DeckT) =>
      deck.id === action.deck.id ? action.deck : deck,
    ),
}

export const addDeck = (deck: DeckT) => ({
  type: ADD_DECK,
  deck,
})
export const updateDeck = (deck: DeckT) => ({
  type: UPDATE_DECK,
  deck,
})

export const upsertDeck = (deck: DeckT) => (
  dispatch: Function,
  getState: Function,
) => {
  const state = getState().decks
  if (state.map((d: DeckT) => d.id).includes(deck.id)) {
    dispatch(updateDeck(deck))
  } else {
    dispatch(addDeck(deck))
  }
}

export const useDecks = () => {
  return useSelector((state: any) => state.decks || [])
}
export const useDecksActions = () => {
  const dispatch = useDispatch()
  return {
    addDeck: (deck: DeckT) => dispatch(addDeck(deck)),
    updateDeck: (deck: DeckT) => dispatch(updateDeck(deck)),
    upsertDeck: (deck: DeckT) => dispatch(upsertDeck(deck)),
  }
}
