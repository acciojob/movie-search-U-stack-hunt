
import React, { useState } from "react";
import './../styles/App.css';



const App = () => {
  const [movies, setMovies] = useState([]);
  const [error,setError]=useState(null);

  const handleSearch = () => {
    setMovies([]);
    const query = document.getElementById("searchInput").value;
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=99eb9fd1`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "False") {
          setError("Invalid movie name. Please try again");
        } else {
          setError(null);
          setMovies(data.Search || []);
        }
      });
  };

  return (
    <div className="App">
      <h1>Search Movie</h1>
      <input id="searchInput" type="text" placeholder="Enter movie name" />
      <button id="searchButton" onClick={() => handleSearch()}>Search</button>
      <div id="movieList">
        {error && <p className="error">{error}</p>}
        {movies.map((movie, index) => (
          <ul key={index} className="movieItem">
            <i>
              <h3>{movie.Title} ({movie.Year})</h3>
              {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} />}
            </i>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default App
