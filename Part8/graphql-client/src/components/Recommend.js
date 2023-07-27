import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = (props) => {
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)

  if (user.loading || books.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = user.data.me.favoriteGenre

  const allBooks = books.data.allBooks

  const bookReco = allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>Recommendations</h2>
      {bookReco.length > 0 ? (
        <div>
          <p>
            Books in your favorite genre <strong>{favoriteGenre}</strong>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {bookReco.map((book, i) => (
                <tr key={i}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          No books have been added yet based on your favorite genre(''){' '}
          <strong>{favoriteGenre}</strong>{' '}
        </p>
      )}
    </div>
  )
}

export default Recommend
