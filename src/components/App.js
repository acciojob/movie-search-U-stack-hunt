
import React, { useState } from "react";
import './../styles/App.css';



const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!query.trim()) {
      setMovies([]);
      setError("Invalid movie name. Please try again");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=99eb9fd1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setMovies([]);
          setError("Invalid movie name. Please try again.");
        } else {
          setMovies(data.Search || []);
          setError(null);
        }
      })
      .catch((err) => {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Search Movie</h1>
      <form onSubmit={handleSearch}>
        <input
          id="searchInput"
          type="text"
          placeholder="Enter movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="searchButton" type="submit">Search</button>
      </form>

      <div id="movieList">
        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}
        <ul>
          {movies.map((movie, index) => (
            <li key={index} className="movieItem">
              <h3>{movie.Title} ({movie.Year})</h3>
              {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
