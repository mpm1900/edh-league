import React, { useState } from 'react'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Plus } from 'baseui/icon'
import { CommanderSelect } from '../CommanderSelect'
import { ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal'
import { Select } from 'baseui/select'
import { Label3 } from 'baseui/typography'
import { StyledLink } from 'baseui/link'
import { Flex } from '../../elements/flex'

export interface CheckInFormT {}
export const CheckInForm = (props: CheckInFormT) => {
  const [createPlayer, setCreatePlayer] = useState(false)
  const [createDeck, setCreateDeck] = useState(false)
  return (
    <div className='CheckInForm'>
      <ModalHeader>Check In</ModalHeader>
      <ModalBody>
        {!createPlayer ? (
          <Flex $dir='row' $style={{ marginBottom: '12px' }}>
            <Select placeholder='Select Player' />
            <Button onClick={() => setCreatePlayer(true)}>
              <Plus />
            </Button>
          </Flex>
        ) : (
          <div>
            <Flex $dir='row' $style={{ marginBottom: '4px' }}>
              <Label3>New Player</Label3>
              <div style={{ flex: 1 }} />
              <StyledLink onClick={() => setCreatePlayer(false)}>
                (Cancel)
              </StyledLink>
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input placeholder='Enter Player Name' />
            </Flex>
          </div>
        )}
        {!createDeck ? (
          <Flex $dir='row'>
            <Select placeholder='Select Deck' />
            <Button onClick={() => setCreateDeck(true)}>
              <Plus />
            </Button>
          </Flex>
        ) : (
          <div>
            <Flex $dir='row' $style={{ marginBottom: '4px' }}>
              <Label3>New Deck</Label3>
              <div style={{ flex: 1 }} />
              <StyledLink onClick={() => setCreateDeck(false)}>
                (Cancel)
              </StyledLink>
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <CommanderSelect />
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input placeholder='Enter Deck Name' />
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input placeholder='URL (Optional)' />
            </Flex>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton>Cancel</ModalButton>
        <ModalButton disabled>Okay</ModalButton>
      </ModalFooter>
    </div>
  )
}
