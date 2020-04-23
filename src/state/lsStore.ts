export const localStore = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  const state = store.getState()
  localStorage.setItem('state', JSON.stringify(state))
  return result
}
