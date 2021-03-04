import React, { useState, useEffect } from "react"

const SearchComponent = () => {
  const [query, setQuery] = useState("")

  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault()
    //empty submit
    if (query === "") return

    const url = `https://api.themoviedb.org/3/search/movie?api_key=c73001170e5a69c4b20b4fc3ce483ba2&language=en-US&query=${query}&page=1&include_adult=false`

    try {
      const res = await fetch(url)
      const data = await res.json()
      // setMovies(JSON.stringify(data.results))
      let titles = []
      data.results.map((x) => titles.push(x))
      setMovies(titles)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          type="text"
          name="query"
          placeholder="American Pie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search{" "}
        </button>
      </form>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={`movie_key_${movie.id}`}>
            {movie.poster_path === null ? (
              <p>poster not available :(</p>
            ) : (
              <img
                className="movie-card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + " poster"}
              />
            )}
            <div className="movie-card--content">
              <h2 className="movie-card--title">{movie.title}</h2>
              <p>
                <small>RELEASE DATE: {movie.release_date}</small>
              </p>
              <p>
                <small>RATING: {movie.vote_average}</small>
              </p>
              <p className="card--desc">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchComponent
