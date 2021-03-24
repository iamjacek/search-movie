import React, { useState, useEffect } from "react"
import MovieCard from "./movieCard-component"

const SearchComponent = () => {
  const [query, setQuery] = useState("")

  const [movies, setMovies] = useState([])

  const [lastPhrases, setLastPhrases] = useState([])

  useEffect(() => {
    getSearchingPhrase()
  }, [movies])

  const addSearchingPhrase = (phrase) => {
    if (localStorage) {
      let existingEntries = JSON.parse(localStorage.getItem("searched"))
      if (existingEntries == null) existingEntries = []
      if (existingEntries.length > 4) existingEntries.pop()
      existingEntries.unshift(phrase)
      localStorage.setItem("searched", JSON.stringify(existingEntries))
    }
  }

  const getSearchingPhrase = () => {
    if (localStorage && localStorage.getItem("searched")) {
      setLastPhrases(JSON.parse(localStorage.getItem("searched")))
    }
  }

  const handleLastSearchPhrase = async (phrase) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=c73001170e5a69c4b20b4fc3ce483ba2&language=en-US&query=${phrase}&page=1&include_adult=false`

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
      addSearchingPhrase(query)
    } catch (err) {
      console.error(err)
    }
  }

  const clearList = () => {
    setMovies([])
  }

  const getDateAndTime = () => {
    return new Date().getTime()
  }

  const topRatedMovies = async (e) => {
    e.preventDefault()

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=c73001170e5a69c4b20b4fc3ce483ba2&certification_country=US&certification=R&sort_by=vote_average.desc`
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

  const popularMovies = async (e) => {
    e.preventDefault()

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=c73001170e5a69c4b20b4fc3ce483ba2&sort_by=popularity.desc`
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

  const bestOf20Movies = async (e) => {
    e.preventDefault()

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=c73001170e5a69c4b20b4fc3ce483ba2&primary_release_year=2020&sort_by=vote_average.desc`
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
      <div className="search--lastSearched">
        <p>LAST TIME YOU'VE SEARCHED:</p>
        {lastPhrases.map((phrase, index) => (
          <button
            onClick={() => handleLastSearchPhrase(phrase)}
            className="search--lastSearch-button"
            key={`${phrase}_${getDateAndTime()}_${index}`}
          >{` ${phrase}`}</button>
        ))}
      </div>
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
      <div className="search--discovery-buttons">
        <button className="search--popular-button" onClick={clearList}>
          Clear List
        </button>
        <button className="search--popular-button" onClick={topRatedMovies}>
          Top Rated Movies
        </button>
        <button className="search--popular-button" onClick={popularMovies}>
          Popular Movies
        </button>
        <button className="search--popular-button" onClick={bestOf20Movies}>
          Best of 2020
        </button>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </div>
    </>
  )
}

export default SearchComponent
