import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogFxn } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleCreate}>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          onChange={handleInputChange}
          name="title"
          value={newBlog.title}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          onChange={handleInputChange}
          name="author"
          value={newBlog.author}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          onChange={handleInputChange}
          name="url"
          value={newBlog.url}
        />
        <Button variant="primary" type="submit">
          add blog
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
