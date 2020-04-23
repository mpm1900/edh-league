import React from 'react'
import { withStyle, useStyletron } from 'baseui'
import { Table } from 'baseui/table'
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table'
import { Checkbox } from 'baseui/checkbox'
import { H1, H2, H3, H4, H5, H6 } from 'baseui/typography'
import { Flex } from '../../elements/flex'
import { Button } from 'baseui/button'
import { StyledLink } from 'baseui/link'
import { CommanderSelect } from '../../components/CommanderSelect'
import { usePopulatedStaging, PopulatedEntryT } from '../../state/staging'

const SmallerHeadCell = withStyle(StyledHeadCell, {
  maxWidth: '30px',
})
const SmallerCell = withStyle(StyledCell, {
  maxWidth: '30px',
})

export const LeaguePlanner = () => {
  const entries = usePopulatedStaging()
  const columns = ['2', 'Name', 'Commander', 'Deck']
  const data: any[][] = entries.map((entry: PopulatedEntryT) => [
    <Checkbox />,
    entry.player.name,
    `${entry.deck.commanders[0].name}${
      entry.deck.commanders[1] ? ', ' + entry.deck.commanders[1].name : ''
    }`,
    entry.deck.name,
  ])

  console.log(entries, data)

  return (
    <div className='LeaguePlanner' style={{ padding: '24px' }}>
      <Flex $dir='row' style={{ marginBottom: '24px', alignItems: 'center' }}>
        <H5 $style={{ margin: 0 }}>Checked in Players:</H5>
        <div style={{ flex: 1 }} />
        <Button>Make Pairings</Button>
      </Flex>
      <StyledTable>
        <StyledHead>
          <SmallerHeadCell>{data.length}</SmallerHeadCell>
          {columns.slice(1).map((col, index) => (
            <StyledHeadCell key={index}>{col}</StyledHeadCell>
          ))}
        </StyledHead>
        <StyledBody>
          {data.map((row, index) => (
            <StyledRow key={index}>
              <SmallerCell>{row[0]}</SmallerCell>
              {row.slice(1).map((cell, cellIndex) => (
                <StyledCell key={cellIndex}>{cell}</StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    </div>
  )
}
