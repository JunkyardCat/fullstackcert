import { useParams } from 'react-router-dom'
//import usersService from '../services/users'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  //console.log('id', id)
  //const user = usersService.getUser(id)
  //const user = getSpecificUser(id)
  const user = useSelector(({ users }) => {
    return users.filter((user) => user.id === id)[0]
  })
  //console.log('user on user.js', user)
  /*
  console.log(
    'userblog',
    user.blogs.map((blog) => blog.id)
  )
  */

  return (
    <div>
      <h2>User</h2>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
