export type ModalContextStateT = any
export type ModalContextActionT = {
  type: string
  [key: string]: any
}
export type ModalContextCoreFn = (
  state: ModalContextStateT,
  action: ModalContextActionT,
) => ModalContextStateT
export type ModalContextCore = {
  [key: string]: ModalContextCoreFn
}
export const initialState = {
  isOpen: false,
  contents: null,
  callback: null,
  payload: null,
  blocking: false,
  style: {},
}

export const OPEN = 'ModalContext/OPEN'
export const CLOSE = 'ModalContext/CLOSE'

export const actions = {
  open: (contents: any, blocking: boolean = false) => ({
    type: OPEN,
    contents,
    blocking,
  }),
  close: () => ({ type: CLOSE }),
}

export const CORE: ModalContextCore = {
  [OPEN]: (state: ModalContextStateT, action: ModalContextActionT) => ({
    ...state,
    isOpen: true,
    contents:
      typeof action.contents === 'undefined' ? state.contents : action.contents,
    blocking:
      typeof action.blocking === 'undefined' ? state.blocking : action.blocking,
  }),
  [CLOSE]: (state: ModalContextStateT, action: ModalContextActionT) => ({
    ...state,
    isOpen: false,
  }),
}

export const reducer = (
  state: ModalContextStateT = initialState,
  action: ModalContextActionT,
): ModalContextStateT => {
  const coreFunction = CORE[action.type]
  return coreFunction ? coreFunction(state, action) : state
}
