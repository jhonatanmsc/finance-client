import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: true,
  messages: [],
}

// @ts-ignore
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'addMessages':
      return { ...state, messages: [...state.messages, ...rest.messages] }
    case 'removeMessage':
      return {
        ...state,
        messages: state.messages.filter((_, i) => i !== rest.index),
      }
    default:
      return state
  }
}

// @ts-ignore
const store = createStore(changeState)
export default store
export type RootState = typeof initialState
