import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogFxn } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    //console.log(event.target)
    setNewBlog({ ...newBlog, [name]: value })
  }
  const handleCreate = (event) => {
    try {
      event.preventDefault()
      //createBlog(newBlog.title, newBlog.author, newBlog.url)

      const content = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }
      dispatch(createBlogFxn(content))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
      setNewBlog({ title: '', author: '', url: '' })
    } catch (exception) {
      dispatch(setNotification(`error on create ${exception}`))
    }
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
