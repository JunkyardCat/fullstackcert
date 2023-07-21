import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/commentReducer'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')
  /*
  const comments = useSelector(({ comments }) => {
    return comments
      .map((comment) => comment)
      .filter((comment) => comment.blog === blog.id)
  })*/
  const comments = useSelector(({ comments }) => {
    //console.log('comments', comments)
    return comments
      .map((comment) => comment)
      .filter((comment) => comment.blog === blog.id)
  })
  //console.log('outside comments', comments)
  const handleCreate = (event) => {
    event.preventDefault()
    const addCommentTemp = {
      comment: comment.value,
      blog: blog.id,
    }
    //console.log('inside Create', comment)
    //console.log('inside Create2', comment.value)
    dispatch(addComment(addCommentTemp))
    comment.reset()
  }
  return (
    <>
      <div>
        <h3>Comment</h3>
      </div>
      <Form onSubmit={handleCreate}>
        <input
          type={comment.type}
          id="comment-input"
          name="comment"
          onChange={comment.onChange}
        />
        <Button id="comment-submit" type="submit">
          submit
        </Button>
        <ul>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                {comment.comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ul>
      </Form>
    </>
  )
}

export default Comment
