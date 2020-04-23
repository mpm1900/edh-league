import React from 'react'
import { Header } from './components'
import { LeaguePlanner } from './domain'

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <LeaguePlanner />
    </div>
  )
}
