import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    initialBlog(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const id = action.payload
      const temp = state.find((blog) => blog.id === id)
      const temp2 = {
        ...temp,
        likes: temp.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : temp2))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { initialBlog, createBlog, likeBlog, deleteBlog } =
  blogSlice.actions

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    //console.log('inside intialize', blogs)
    dispatch(initialBlog(blogs))
  }
}

export const createBlogFxn = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(createBlog(blog))
  }
}

export const likeBlogFxn = (content) => {
  return async (dispatch) => {
    const blog = await blogService.update(content.id, content)
    dispatch(likeBlog(blog.id))
  }
}

export const deleteBlogFxn = (id) => {
  return async (dispatch) => {
    await blogService.deleteOneBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
