import React from "react"
import "./movieCard-component.css"

const MovieCard = ({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
  overview,
}) => {
  return (
    <>
      <div className="movie-card">
        {poster_path === null ? (
          <div className="movie-card--default-image">
            poster not available :(
          </div>
        ) : (
          <img
            className="movie-card--image"
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
            alt={title + " poster"}
          />
        )}
        <div className="movie-card--content">
          <h2 className="movie-card--title">{title}</h2>
          <p>
            <small>RELEASE DATE: {release_date}</small>
          </p>
          <p>
            <small>RATING: {vote_average}</small>
          </p>
          <p className="card--desc">{overview}</p>
        </div>
      </div>
    </>
  )
}

export default MovieCard
