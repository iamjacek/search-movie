import React, { useEffect, useState } from "react"
import "./movie-component.css"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Movie = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState("")
  const [rate, setRate] = useState(5)
  const [toastMsg, setToastMsg] = useState(false)
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setMovie(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [url])

  if (loading) {
    return <h1>Loading ...</h1>
  }

  const handleRateMovie = (e, movieID) => {
    e.preventDefault()
    //check if session exist and if is not expired and get session ID
    if (
      localStorage &&
      localStorage.getItem("expires_at") &&
      localStorage.getItem("session_id")
    ) {
      const guestSessionId = JSON.parse(localStorage.getItem("session_id"))
      //request a post with rate value
      const rateUrl = `https://api.themoviedb.org/3/movie/${movieID}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`

      const data = { value: `${rate}` }

      fetch(rateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data)
          if (data.success === true) setToastMsg(true)
        })
        .catch((error) => {
          console.error("Error:", error)
        })

      //show whether movie is rated or any error occured
    }
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
            <form onSubmit={(e) => handleRateMovie(e, movie.id)}>
              <label htmlFor="rate">
                Rate movie (between 0.5 and 10): {rate}
              </label>
              <input
                type="range"
                name="rate"
                min="0.5"
                max="10"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
              {toastMsg && <p>You have successfuly rated a movie!</p>}
              <button className="movie--rate-button" type="submit">
                Rate it!
              </button>
            </form>
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
