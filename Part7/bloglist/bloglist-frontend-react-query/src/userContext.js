import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (prop) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {prop.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userNDispatch = useContext(UserContext)
  return userNDispatch[0]
}

export const useUserDispatch = () => {
  const userNDispatch = useContext(UserContext)
  return userNDispatch[1]
}
