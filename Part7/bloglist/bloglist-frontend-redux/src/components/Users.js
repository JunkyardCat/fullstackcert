import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  /*
  const users = useSelector((state) => {
    console.log('userselector', state.user)
    return state.user
  })
  */
  const users = useSelector(({ users }) => {
    return users.map((user) => user)
  })
  //console.log('users', users, typeof users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td></td>
            <td>
              <h3>blogs created</h3>
            </td>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )
}

export default Users
