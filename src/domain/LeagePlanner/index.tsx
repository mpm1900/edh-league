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

const SmallerHeadCell = withStyle(StyledHeadCell, {
  maxWidth: '30px',
})
const SmallerCell = withStyle(StyledCell, {
  maxWidth: '30px',
})

export const LeaguePlanner = () => {
  const columns = ['2', 'Name', 'Commander', 'Deck']
  const data = [
    [
      <Checkbox />,
      'Max Miller',
      'Thrasios and Tymna',
      <Flex $dir='row' $style={{ alignItems: 'center' }}>
        <StyledLink href='#' style={{ marginRight: '12px' }}>
          Razakats
        </StyledLink>
        <i className='ms ms-w' />
        <i className='ms ms-u' />
        <i className='ms ms-b' />
        <i className='ms ms-g' />
      </Flex>,
    ],
    [
      <Checkbox />,
      'Jeremy Wagner',
      'Thrasios and Tymna',
      <Flex $dir='row' $style={{ alignItems: 'center' }}>
        <StyledLink href='#' style={{ marginRight: '12px' }}>
          Sushi Hulk
        </StyledLink>
        <i className='ms ms-w' />
        <i className='ms ms-u' />
        <i className='ms ms-b' />
        <i className='ms ms-g' />
      </Flex>,
    ],
  ]
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
