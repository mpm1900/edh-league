import React, { useState } from 'react'
import { ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal'
import { Input } from 'baseui/input'
import { useSeasonsActions } from '../../state/seasons'
import { useHistory } from 'react-router'
import { useModalContext } from '../../contexts/ModalContext'
import { v4 } from 'uuid'

export interface NewSeasonFormT {}
export const NewSeasonForm = (props: NewSeasonFormT) => {
  const [name, setName] = useState('')
  const { addSeason } = useSeasonsActions()
  const history = useHistory()
  const modalContext = useModalContext()
  const handleSubmit = () => {
    addSeason({ id: v4(), name })
    history.push('/')
    modalContext.close()
  }
  return (
    <div className='NewSeasonForm'>
      <ModalHeader>Create New Season</ModalHeader>
      <ModalBody>
        <Input
          placeholder='Season Name'
          onChange={(e: any) => setName(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleSubmit}>Create</ModalButton>
      </ModalFooter>
    </div>
  )
}
