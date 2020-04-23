import React, { useState } from 'react'
import { v4 } from 'uuid'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Plus } from 'baseui/icon'
import { CommanderSelect } from '../CommanderSelect'
import { ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal'
import { Select } from 'baseui/select'
import { Label3 } from 'baseui/typography'
import { StyledLink } from 'baseui/link'
import { Flex } from '../../elements/flex'
import { useDecks, useDecksActions, DeckT } from '../../state/decks'
import { usePlayers, usePlayersActions, PlayerT } from '../../state/players'
import { useStagingActions } from '../../state/staging'
import { useModalContext } from '../../contexts/ModalContext'

export interface CheckInFormT {}
export const CheckInForm = (props: CheckInFormT) => {
  const modalContext = useModalContext()
  const [deckId, setDeckId] = useState<string>('')
  const [playerId, setPlayerId] = useState<string>('')
  const [tempDeck, setTempDeck] = useState<DeckT>({
    id: v4(),
    userId: '',
    name: '',
    commanders: [],
  })
  const [tempPlayer, setTempPlayer] = useState<PlayerT>({ id: v4(), name: '' })
  const decks = useDecks()
  const players = usePlayers()
  const { upsertDeck } = useDecksActions()
  const { upsertPlayer } = usePlayersActions()
  const { addEntry } = useStagingActions()
  const [createPlayer, setCreatePlayer] = useState(players.length === 0)
  const [createDeck, setCreateDeck] = useState(decks.length === 0)

  const handleSubmit = () => {
    let _deckId = deckId
    let _playerId = playerId
    if (createPlayer) {
      upsertPlayer(tempPlayer)
      _playerId = tempPlayer.id
    }
    if (createDeck) {
      upsertDeck({
        ...tempDeck,
        userId: tempPlayer.id,
      })
      _deckId = tempDeck.id
    }

    addEntry({
      id: v4(),
      playerId: _playerId,
      deckId: _deckId,
    })
    modalContext.close()
  }

  return (
    <div className='CheckInForm'>
      <ModalHeader>Check In</ModalHeader>
      <ModalBody>
        {!createPlayer ? (
          <Flex $dir='row' $style={{ marginBottom: '12px' }}>
            <Select
              placeholder='Select Player'
              options={players}
              labelKey='name'
            />
            <Button onClick={() => setCreatePlayer(true)}>
              <Plus />
            </Button>
          </Flex>
        ) : (
          <div>
            <Flex $dir='row' $style={{ marginBottom: '4px' }}>
              <Label3>New Player</Label3>
              <div style={{ flex: 1 }} />
              {players.length > 0 && (
                <StyledLink onClick={() => setCreatePlayer(false)}>
                  (Cancel)
                </StyledLink>
              )}
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input
                value={tempPlayer.name}
                placeholder='Enter Player Name'
                onChange={(e: any) => {
                  e.persist()
                  console.log('event', e)
                  setTempPlayer((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }}
              />
            </Flex>
          </div>
        )}
        {!createDeck ? (
          <Flex $dir='row'>
            <Select placeholder='Select Deck' options={decks} labelKey='name' />
            <Button onClick={() => setCreateDeck(true)}>
              <Plus />
            </Button>
          </Flex>
        ) : (
          <div>
            <Flex $dir='row' $style={{ marginBottom: '4px' }}>
              <Label3>New Deck</Label3>
              <div style={{ flex: 1 }} />
              {decks.length > 0 && (
                <StyledLink onClick={() => setCreateDeck(false)}>
                  (Cancel)
                </StyledLink>
              )}
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <CommanderSelect
                onChange={(cards: any[]) => {
                  console.log('CARDS onc', cards)
                  setTempDeck((d) => ({
                    ...d,
                    commanders: cards,
                  }))
                }}
              />
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input
                placeholder='Enter Deck Name'
                onChange={(e: any) => {
                  e.persist()
                  console.log('event', e)
                  setTempDeck((d) => ({
                    ...d,
                    name: e.target.value,
                  }))
                }}
              />
            </Flex>
            <Flex $dir='row' $style={{ marginBottom: '12px' }}>
              <Input placeholder='URL (Optional)' />
            </Flex>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={modalContext.close}>Cancel</ModalButton>
        <ModalButton onClick={handleSubmit}>Okay</ModalButton>
      </ModalFooter>
    </div>
  )
}
