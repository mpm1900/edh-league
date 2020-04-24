import React from 'react'
import { DeckT } from '../../state/decks'
import { Flex } from '../../elements/flex'

const getColorIdentity = (deck: DeckT) => {
  let colors: string[] = []
  deck.commanders.forEach((card) => {
    colors = [...colors, ...card.color_identity]
  })
  const set = new Set(colors)
  return [...(set as any)]
}

const getColor = (color: string) => {
  switch (color) {
    case 'W':
      return 'white'
    case 'U':
      return 'blue'
    case 'B':
      return 'black'
    case 'R':
      return 'red'
    case 'G':
      return 'green'
    default:
      return '#999'
  }
}
const Pip = (props: any) => {
  const { color } = props
  return (
    <div
      style={{
        height: 12,
        width: 12,
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.54)',
        backgroundColor: getColor(color),
        marginRight: '2px',
      }}
    />
  )
}

export interface DeckNameT {
  deck: DeckT
}
export const DeckName = (props: DeckNameT) => {
  const { deck } = props
  return (
    <Flex $dir='row' $style={{ alignItems: 'center' }}>
      <Flex $dir='row' style={{ marginRight: '10px' }}>
        {getColorIdentity(deck).map((color) => (
          <Pip color={color} />
        ))}
      </Flex>
      {deck.name}
    </Flex>
  )
}
