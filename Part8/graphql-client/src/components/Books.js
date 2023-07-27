import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks || []
  const temp = books.flatMap((book) => book.genres)
  const genres = [...new Set(temp)]
  //const genres = [...new Set(books.flatMap((book) => book.genres))]
  //const temp = [...books.map((a) => a.genres)]
  console.log('genre value', genre)
  return (
    <div>
      <h2>books</h2>
      in genre <strong>{genre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((a) => (genre !== 'all' ? a.genres.includes(genre) : a))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('all')}>all genre</button>
      </div>
    </div>
  )
}

export default Books
