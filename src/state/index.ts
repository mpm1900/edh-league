import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { core as players } from './players'
import { core as decks } from './decks'
import { core as staging } from './staging'
import { core as seasons } from './seasons'

export const makeReducer = (core: any) => (
  state: any[] = [],
  action: any = {},
) => {
  const coreFn = core[action.type]
  if (coreFn && typeof coreFn === 'function') {
    return coreFn(state, action)
  }
  return state
}

export const reducer = combineReducers({
  players: makeReducer(players),
  decks: makeReducer(decks),
  staging: makeReducer(staging),
  seasons: makeReducer(seasons),
})

export const makeStore = () => {
  return createStore(reducer, applyMiddleware(thunk))
}
