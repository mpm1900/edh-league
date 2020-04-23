import { PlayerT } from '../players'

export const ADD_GAMES = 'games/ADD_GAMES'

const getPlayerPoints = (
  players: PlayerT[],
  games: any[],
  seasonId: string,
): { [key: string]: number } => {
  let ret: { [key: string]: number } = {}
  const init = 0 // can be anything
  const seasonGames = games.filter((game: any) => game.seasonId === seasonId)
  players.forEach((player: PlayerT) => {
    ret[player.id] = init
  })
  seasonGames.forEach((game: any) => {
    game.players.forEach((playerId: string) => {
      const player = players.find((p) => p.id === playerId)
      const isWinner = playerId === game.winner
      if (isWinner) {
        ret[playerId] += 0 // ...
      } else {
        ret[playerId] -= 0 // ...
      }
    })
  })
  return ret
}
