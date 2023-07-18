import { useState } from 'react'



const Blog = ({ blog, updateLikes, deleteBlog , username }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogUpdate = {
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:blog.likes+1,
      user:blog.user.id
    }
    //console.log('inside handlelike', blog.id, blogUpdate)
    updateLikes(blog.id, blogUpdate)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }
  return (
    <div className='blog'>
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>
        <button onClick={toggleVisibility}>
          {visible ? 'hide':'show'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>likes:{blog.likes}<button id='like-button' onClick={handleLike}>like</button></div>
          <div>url:{blog.url}</div>
          <div>{blog.user.username}</div>
          {blog.user.username === username && (
            <button id='delete-button' onClick={handleDelete}>delete</button>
          )}
        </div>
      )}

    </div>
  )

}

export default Blog
