import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from './domain'
import { Header } from './components'
import { Seasons } from './domain/Seasons'

export const HeaderRoutes = () => {
  return (
    <Switch>
      <Route path='/seasons'>
        <Header showHome />
      </Route>
      <Route path='/'>
        <Header showSeasons checkin />
      </Route>
    </Switch>
  )
}

export const MainRoutes = () => {
  return (
    <Switch>
      <Route path='/seasons'>
        <Seasons />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
