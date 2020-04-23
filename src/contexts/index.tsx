import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { DarkTheme, BaseProvider, styled } from 'baseui'
import { BrowserRouter } from 'react-router-dom'
import { ModalContextProvider } from './ModalContext'
import { makeStore } from '../state'

const store = makeStore(JSON.parse(localStorage.getItem('state') || ''))
const engine = new Styletron()
export interface AppContextProviderT {
  children: any
}
export const AppContextProvider = (props: AppContextProviderT) => {
  const { children } = props
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <StyletronProvider value={engine}>
          <BaseProvider theme={DarkTheme}>
            <ModalContextProvider>{children}</ModalContextProvider>
          </BaseProvider>
        </StyletronProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}
