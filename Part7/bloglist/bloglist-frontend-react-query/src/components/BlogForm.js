import { useState } from 'react'
import { addBlog } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    //console.log(event.target)
    setNewBlog({ ...newBlog, [name]: value })
  }

  const newBlogMutate = useMutation(addBlog, {
    onSuccess: (newBlog) => {
      //console.log('mutate start')
      const blogs = queryClient.getQueryData('blogs')
      //console.log(blogs)
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
      setNewBlog({ title: '', author: '', url: '' })
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'error',
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
    },
  })

  const handleCreate = (event) => {
    event.preventDefault()
    //createBlog(newBlog.title, newBlog.author, newBlog.url)
    const test = { ...newBlog }
    //console.log('handleCreate', newBlog, test)
    newBlogMutate.mutate(test)
    setNewBlog({ title: '', author: '', url: '' })
  }
  return (
    <div>
      <form onSubmit={handleCreate}>
        title:{' '}
        <input
          type="text"
          id="input-title"
          name="title"
          onChange={handleInputChange}
          value={newBlog.title}
        />
        author:{' '}
        <input
          type="text"
          id="input-author"
          name="author"
          onChange={handleInputChange}
          value={newBlog.author}
        />
        url:{' '}
        <input
          type="text"
          id="input-url"
          name="url"
          onChange={handleInputChange}
          value={newBlog.url}
        />
        <button id="create-blog" type="submit">
          add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
