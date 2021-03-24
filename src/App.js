import React, { useEffect } from "react"
import SearchComponent from "./components/search-component"
import Movie from "./components/movie-component"
import "./components/search-component.css"
import "./App.css"
import { Router, Link } from "@reach/router"

function App() {
  const session = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    //guest session id and when expires
    if (
      (localStorage && localStorage.getItem("session_id") === null) ||
      (localStorage && localStorage.getItem("session_id") === undefined)
    ) {
      async function createGuestSession() {
        try {
          const res = await fetch(session)
          const data = await res.json()
          localStorage.setItem(
            "session_id",
            JSON.stringify(data.guest_session_id)
          )
          localStorage.setItem("expires_at", JSON.stringify(data.expires_at))
        } catch (err) {
          console.error(err)
        }
      }
      createGuestSession()
    }

    //new session when expired
    if (
      localStorage &&
      localStorage.getItem("expires_at") &&
      localStorage.getItem("session_id")
    ) {
      const expiresAt = localStorage.getItem("expires_at")
      if (new Date().getTime() < expiresAt) {
        async function createGuestSession() {
          try {
            const res = await fetch(session)
            const data = await res.json()
            localStorage.setItem(
              "session_id",
              JSON.stringify(data.guest_session_id)
            )
            localStorage.setItem("expires_at", JSON.stringify(data.expires_at))
          } catch (err) {
            console.error(err)
          }
        }
        createGuestSession()
      }
    }
  }, [session])

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
