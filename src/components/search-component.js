import React, { useState } from "react"
import MovieCard from "./movieCard-component"

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
      let collection = []
      data.results.map((x) => collection.push(x))
      setMovies(collection)
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
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
    </>
  )
}

export default SearchComponent
