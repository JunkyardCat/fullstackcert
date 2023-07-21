import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      //console.log('iniside slice')
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    //console.log('inside intialzie')
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
