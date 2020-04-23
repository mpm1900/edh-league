import React, { useEffect, useState } from 'react'
import { withStyle } from 'baseui'
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table'
import { Checkbox } from 'baseui/checkbox'
import { H1, H2, H3, H4, H5, H6, Label3 } from 'baseui/typography'
import { Flex } from '../../elements/flex'
import { Button } from 'baseui/button'
import { usePopulatedStaging, PopulatedEntryT } from '../../state/staging'
import { DeckName } from '../../components/DeckName'
import { Select } from 'baseui/select'
import { useHistory } from 'react-router'
import { useSeasons } from '../../state/seasons'

const SmallerHeadCell = withStyle(StyledHeadCell, {
  maxWidth: '30px',
})
const SmallerCell = withStyle(StyledCell, {
  maxWidth: '30px',
})

export const Home = () => {
  const history = useHistory()
  const entries = usePopulatedStaging()
  const seasons = useSeasons()
  const [season, setSeason] = useState()
  const columns = ['2', 'Name', 'Commander', 'Deck']
  const data: any[][] = entries.map((entry: PopulatedEntryT) => [
    <Checkbox />,
    entry.player.name,
    `${entry.deck.commanders[0].name}${
      entry.deck.commanders[1] ? ', ' + entry.deck.commanders[1].name : ''
    }`,
    <DeckName deck={entry.deck} />,
  ])

  useEffect(() => {
    if (seasons.length === 0) {
      history.push('/seasons')
    }
  }, [])

  return (
    <div className='Home' style={{ padding: '24px' }}>
      <Flex $dir='row' style={{ marginBottom: '24px', alignItems: 'center' }}>
        <H5 $style={{ margin: 0 }}>Checked in Players:</H5>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: '300px' }}>
          <Select
            creatable={false}
            searchable={false}
            value={season}
            placeholder='Select Season'
            options={seasons}
            labelKey='name'
            onChange={(e: any) => setSeason(e.value[0])}
          />
        </div>
        <Button disabled={entries.length <= 2}>Make Pairings</Button>
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
