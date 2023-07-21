import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogFxn, likeBlogFxn } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, username }) => {
  //const blogtest = useSelector((state) => state.blog)
  //const blogtest = useSelector(({ blog }) => blog)
  //const blogtest2 = useSelector((state) => state.blog)
  //console.log('inside blog', blogtest)
  //console.log('inisde blog2', blogtest2)
  const dispatch = useDispatch()
  //console.log('inside blog3', blog)

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
    }
    //console.log('inside handlelike', blog.id, blogUpdate)
    //updateLikes(blog.id, blogUpdate)
    //console.log('inside handleLike', blog)
    dispatch(likeBlogFxn(blogUpdate))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogFxn(blog.id))
      dispatch(setNotification('blog removed'))
      //deleteBlog(blog.id)
    }
  }
  /*
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
  */
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
            <Button id="like-button" onClick={handleLike}>
              like
            </Button>
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
