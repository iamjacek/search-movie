import SearchComponent from "./components/search-component"
import Movie from "./components/movie-component"
import "./components/search-component.css"
import "./App.css"
import { Router, Link } from "@reach/router"

function App() {
  return (
    <>
      <div className="container">
        <nav>
          <Link to="/">
            <h1>Movie Search App</h1>
          </Link>
        </nav>
        <Router>
          <SearchComponent path="/" />
          <Movie path="/movie/:id" />
        </Router>
        <div className="push"></div>
      </div>
      <footer>
        Search Movie App is based on{" "}
        <a href="https://www.themoviedb.org/documentation/api">TMDB API</a>
      </footer>
    </>
  )
}

export default App
