import { useSelector, useDispatch } from 'react-redux'
import { removeEntry } from '../staging'

export const ADD_SEASON = 'seasons/ADD_SEASON'
export const UPDATE_SEASON = 'seasons/UPDATE_SEASON'
export const REMOVE_SEASON = 'seasons/REMOVE_SEASON'

export interface SeasonT {
  id: string
  name: string
}

export const addSeason = (season: SeasonT) => ({
  type: ADD_SEASON,
  season,
})
export const updateSeason = (season: SeasonT) => ({
  type: UPDATE_SEASON,
  season,
})
export const removeSeason = (seasonId: string) => ({
  type: REMOVE_SEASON,
  seasonId,
})

export const core: any = {
  [ADD_SEASON]: (state: SeasonT[], action: any) => [...state, action.season],
  [UPDATE_SEASON]: (state: SeasonT[], action: any) => [
    ...state.filter((s: SeasonT) => s.id !== action.season.id),
    action.season,
  ],
  [REMOVE_SEASON]: (state: SeasonT[], action: any) =>
    state.filter((s: SeasonT) => s.id !== action.seasonId),
}

export const useSeasons = () => useSelector((state: any) => state.seasons)
export const useSeasonsActions = () => {
  const dispatch = useDispatch()
  return {
    addSeason: (season: SeasonT) => dispatch(addSeason(season)),
    updateSeason: (season: SeasonT) => dispatch(updateSeason(season)),
    removeSeason: (seasonId: string) => dispatch(removeSeason(seasonId)),
  }
}
