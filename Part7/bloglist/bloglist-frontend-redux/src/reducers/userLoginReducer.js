import { createSlice } from '@reduxjs/toolkit'

const userLoginSlice = createSlice({
  name: 'userlogin',
  initialState: null,
  reducers: {
    login(state, action) {
      const user = action.payload
      return user
    },
    logout(state, action) {
      return null
    },
  },
})

export const { login, logout } = userLoginSlice.actions

export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(login(user))
  }
}

export const userLogout = (user) => {
  return (dispatch) => {
    dispatch(logout())
  }
}

export default userLoginSlice.reducer
