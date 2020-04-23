import React from 'react'
import { MainRoutes, HeaderRoutes } from './routes'

export const App = () => {
  return (
    <div className='App'>
      <HeaderRoutes />
      <MainRoutes />
    </div>
  )
}
