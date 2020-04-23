import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { DarkTheme, BaseProvider, styled } from 'baseui'
import { ModalContextProvider } from './ModalContext'
import { makeStore } from '../state'

const store = makeStore()
const engine = new Styletron()
export interface AppContextProviderT {
  children: any
}
export const AppContextProvider = (props: AppContextProviderT) => {
  const { children } = props
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
  }, [JSON.stringify(store.getState())])
  return (
    <ReduxProvider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={DarkTheme}>
          <ModalContextProvider>{children}</ModalContextProvider>
        </BaseProvider>
      </StyletronProvider>
    </ReduxProvider>
  )
}
