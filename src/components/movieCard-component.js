import React, { useState } from "react"
import "./movieCard-component.css"

const MovieCard = ({
  poster_path,
  title,
  release_date,
  vote_average,
  overview,
}) => {
  const [sliceTo, setSliceTo] = useState(100)
  const handleClick = () => {
    sliceTo === 100 ? setSliceTo(300) : setSliceTo(100)
  }

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
          <p className="movie-card--description">
            {overview.slice(0, sliceTo)}
          </p>
        </div>
        <button className="movie-card--button" onClick={handleClick}>
          {sliceTo === 100 ? "Read more" : "Close"}
        </button>
      </div>
    </>
  )
}

export default MovieCard
