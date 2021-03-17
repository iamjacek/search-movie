import React, { useEffect, useState } from "react"
import "./movie-component.css"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Movie = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState("")
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c73001170e5a69c4b20b4fc3ce483ba2`

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setMovie(data)
        setLoading(false)
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [url])

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div className="movie">
      {movie.poster_path === null ? (
        <div className="movie--default-image">poster not available :(</div>
      ) : (
        <div className="movie--default-image">
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
            alt={movie.title + " poster"}
          />
        </div>
      )}
      <div className="movie--description">
        <h2 className="movie--title">
          {movie.title}
          {" (" + movie.release_date.slice(0, 4) + ")"}
          <div className="movie--circular-progressbar">
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${movie.vote_average * 10}%`}
            />
          </div>
        </h2>

        <p className="movie--genres">
          <strong>TYPE: </strong>
          {movie.genres.map((genre) => (
            <span key={genre.id}>{" " + genre.name}</span>
          ))}
        </p>
        <p>
          <small>
            <strong>RELEASE DATE:</strong> {movie.release_date}{" "}
            {movie.runtime ? (
              <span>
                <strong>LENGTH: </strong>{" "}
                {Math.floor(movie.runtime / 60) +
                  "h" +
                  " " +
                  (
                    (movie.runtime / 60 - Math.floor(movie.runtime / 60)) *
                    60
                  ).toFixed(0) +
                  "m"}
              </span>
            ) : (
              ""
            )}
          </small>
        </p>

        <p className="movie--description">{movie.overview}</p>
      </div>
    </div>
  )
}

export default Movie
