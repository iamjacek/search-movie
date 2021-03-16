import SearchComponent from "./components/search-component"
import Movie from "./components/movie-component"
import "./components/search-component.css"
import "./App.css"
import { Router, Link } from "@reach/router"

function App() {
  return (
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
    </div>
  )
}

export default App
