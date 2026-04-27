import './App.css';
// allows us to use AxiosConfig to access the BackendURL 
import api from './API/AxiosConfig';

// creates a piece of state to hold movie data that we fetch from API
import { useEffect, useState } from 'react';

// import to use Layout component from Layout.js
import Layout from './Components/Layout';

// import to use Router component from react-router-dom
import { Routes, Route } from 'react-router-dom';

// import to use Home component from Home.js
import Home from './Components/home/Home';

// import to use Header component from Header.js
import Header from './Components/header/Header';

import Reviews from './Components/reviews/reviews';

function App() {

// state to store the movies in destructured array to store movies from API call
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  // async function to fetch movies from API
  const getMovies = async () => {
    // use axios to get the movies from the API

    try {
      const response = await api.get('/api/v1/movies');
      console.log(response.data);
      setMovies(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewsIds || []);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMovies();

  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies = {movies} />}/>
          <Route
            path="/movie/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
