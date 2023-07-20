import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    createComment(state, action) {
      state.push(action.payload)
    },
    initialComment(state, action) {
      return action.payload
    },
  },
})

export const { initialComment, createComment } = commentSlice.actions

export const initializeComment = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll()
    dispatch(initialComment(comments))
  }
}

export const addComment = (newComment) => {
  return async (dispatch) => {
    const comment = await commentService.addComment(newComment)
    dispatch(createComment(comment))
  }
}

export default commentSlice.reducer
