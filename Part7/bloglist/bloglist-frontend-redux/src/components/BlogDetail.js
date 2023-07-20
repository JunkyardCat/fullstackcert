import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlogFxn } from '../reducers/blogReducer'
import Comment from './Comment'

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const blog = useSelector((state) => {
    return state.blog.filter((a) => {
      return a.id === id
    })[0]
  })

  const updateLikes = () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    }
    dispatch(likeBlogFxn(updatedBlog))
  }
  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        likes:{blog.likes}
        <button onClick={updateLikes}>like</button>
      </div>
      <p>added by {blog.author}</p>
      <Comment blog={blog} />
    </div>
  )
}

export default BlogDetail
