import { useState } from 'react'
import { removeBlog, updateBlog } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const updateLike = useMutation(updateBlog, {
    onSuccess: (blogToBeUpdated) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) =>
          blog.id !== blogToBeUpdated.id ? blog : blogToBeUpdated
        )
      )
    },
  })
  const handleLike = () => {
    const blogUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    //console.log('inside handlelike', blog.id, blogUpdate)
    //updateLikes(blog.id, blogUpdate)
    updateLike.mutate(blogUpdate)
  }
  const removeBlogMutation = useMutation(removeBlog, {
    onSuccess: (blogToBeRemoved) => {
      const blogs = queryClient.getQueryData('blogs')
      //console.log('mutation', blogToBeRemoved.id, blogToBeRemoved)
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== blogToBeRemoved)
      )
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'blog deleted',
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
        })
      }, 5000)
    },
  })

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      //deleteBlog(blog.id)
      //console.log('inside handle delete', blog)
      removeBlogMutation.mutate(blog)
    }
  }
  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>
            likes:{blog.likes}
            <button id="like-button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>url:{blog.url}</div>
          <div>{blog.user.username}</div>
          {blog.user.username === username && (
            <button id="delete-button" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
