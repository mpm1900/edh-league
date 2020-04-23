import React, { useEffect } from 'react'
import { useModalContext } from '../../contexts/ModalContext'
import { useSeasons } from '../../state/seasons'
import { NewSeasonForm } from '../../components/NewSeasonForm'

export const Seasons = () => {
  const modalContext = useModalContext()
  const seasons = useSeasons()

  useEffect(() => {
    if (seasons.length === 0) {
      modalContext.open(<NewSeasonForm />)
    }
  }, [])

  return (
    <div className='Seasons'>
      <h1>Seasons</h1>
    </div>
  )
}
