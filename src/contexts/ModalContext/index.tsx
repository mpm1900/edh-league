import React, { useContext, useReducer, useMemo } from 'react'
import { Modal, SIZE, ROLE } from 'baseui/modal'
import { actions, ModalContextStateT, reducer, initialState } from './state'

const defaultContext = {
  open: (contents: any, blocking?: boolean) => {},
  close: (payload?: any) => {},
}
export const ModalContext = React.createContext(defaultContext)
export const useModalContext = () => useContext(ModalContext)

const getContextValue = (state: ModalContextStateT, dispatch: Function) => ({
  isOpen: state.isOpen,
  open: (contents: any, blocking?: boolean) =>
    dispatch(actions.open(contents, blocking)),
  close: (payload?: any) => {
    if (state.callback) state.callback(payload || state.payload)
    dispatch(actions.close())
  },
})

export interface ModalContextProviderT {
  children: any
}
export const ModalContextProvider = (props: ModalContextProviderT) => {
  const { children } = props
  const reducerValue = useReducer(reducer, initialState)
  const [state] = reducerValue
  const context = useMemo(() => getContextValue(...reducerValue), reducerValue)

  return (
    <ModalContext.Provider value={context}>
      {children}
      <Modal
        onClose={context.close}
        closeable={!state.blocking}
        isOpen={state.isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        {state.contents}
      </Modal>
    </ModalContext.Provider>
  )
}
