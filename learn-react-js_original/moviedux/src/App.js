
import './App.css';
import './styles.css';
import React, {useState, useEffect} from 'react';

//import components:
import Header from './components/Header'; 
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import Watchlist from './components/Watchlist';
//router contains routes (a collection of single routes), link is like an A tag
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; //import router ++++++++

function App(){

  //creating a movies state:
  const [movies, setMovies] = useState([]); //initialising movies as empty array.

  //create watchlist ste:
  const[watchlist, setWatchlist] = useState([]);

  const toggleWatchlist =(movieId)=>{
    setWatchlist((prev) => 
      //if previous state includes movie id, then filter it out by just grabbing other ids,
      //or if it doesnt include the id, then add it along with the other watchlist elements of previuos state as new arrray for set method
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };


  useEffect(()=>{ //takes anono func as first arg
    //use fetch function to get data from url:
    //path 'moveis.json' works here as this component is injected into index.html and movies.json lives there too
    fetch('movies.json') //.then as this could take a while!
    .then(response => response.json()) //response is what's returned from the fetch, which we then return as json data
    .then(jsonData => setMovies(jsonData)); //then returned json data is passed into setMovies() to set the state for movies

}, []); //sending empty array as 2nd arg as we dont want to provide any ibfo on when to repeat this effect (as we only want it working once)


  return(
    //'contrainer' class div below just sets a width for element within page

    /*ROUTING:

    + A router contains routes.
    + routes contain one or more route
    + rout has a path to direct to ("/" is for home) 
    and an element to show on that path (a component in examples below)
    so:
    <Route path="/" element={<MoviesGrid/>}></Route> 
    means: on home page, show MoviesGrid component.
    + Link tag to="" links user to the route path with the given component

    + both components need to know about movies and watchlist states so are passed them as props
    and also nedd access to the toggle function, so are passed that too

    */
    <div className="App">

      <div className='container'>
        <Header/>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          
          <Routes>
            <Route path="/" element={<MoviesGrid watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist}/>}></Route>
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist}/>}></Route> 
          </Routes>
        </Router>

      </div>

      <Footer/>

    </div>
  );
}

export default App;
