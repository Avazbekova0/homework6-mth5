import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [films, setFilms] = useState([])

  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: ''
  })

  const getMovies = () => {
    axios
      .get('http://localhost:8000/movies')
      .then(({ data }) => {
        setFilms(data)
      })
      .catch((e) => console.log(e))
  }

  const createMovie = (movie) => {
    axios
      .post('http://localhost:8000/movies', movie)
      .then(() => {
        getMovies()

        setNewMovie({
          title: '',
          poster: ''
        })
      })
      .catch((e) => console.log(e))
  }

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:8000/movies/${id}`)
      .then(() => {
        getMovies()
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div>
      <h2>NETFLIX</h2>
      <hr />
      <div className='main_bg'>
          <h1>STRANGER 
          THINGS</h1>
      </div>
      <input
        type="text"
        placeholder="Название фильма"
        value={newMovie.title}
        onChange={(e) =>
          setNewMovie({
            ...newMovie,
            title: e.target.value
          })
        }
      />

      <input
        type="url"
        placeholder="Ссылка на постер"
        value={newMovie.poster}
        onChange={(e) =>
          setNewMovie({
            ...newMovie,
            poster: e.target.value
          })
        }
      />

      <button onClick={() => createMovie(newMovie)}>
        Добавить фильм
      </button>

      <div className='getMovies'>

        {films.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>

            <img
              src={movie.poster}
              alt={movie.title}
              width="200"
            />

            <br />

            <button onClick={() => deleteMovie(movie.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
