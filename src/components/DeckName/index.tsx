import React from 'react'
import { DeckT } from '../../state/decks'

const getColorIdentity = (deck: DeckT) => {
  let colors: string[] = []
  deck.commanders.forEach((card) => {
    colors = [...colors, ...card.color_identity]
  })
  const set = new Set(colors)
  return [...(set as any)]
}

export interface DeckNameT {
  deck: DeckT
}
export const DeckName = (props: DeckNameT) => {
  const { deck } = props
  return (
    <div>
      {deck.name} - {getColorIdentity(deck)}
    </div>
  )
}
