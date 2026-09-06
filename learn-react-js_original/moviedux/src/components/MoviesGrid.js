import React, {useState} from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({movies, watchlist, toggleWatchlist}){ //args passed as props where component is defined (in App.js)

    /*creating a state:
    'movies' is the variable 
    'setMovies' is method that updates movies (it's state)
    */
    ////////const [movies, setMovies] = useState([]); //initialising movies as empty array.

    /*
    We have to use an effect to set the initial state of the movies:
    i.e only ONCE when the component first renders (like an initialiser - I think!)
    setMovies(['movie 1','movie 2']) WONT work here, as this component keeps rendering, so this will keep being done!
    */

    //create state for search:
    const [searchTerm, setSearchTerm] = useState(""); //initialise with empty string

    //create states for genre & rating:
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    /*useEffect(()=>{ //takes anono func as first arg
        //const testMovies = ['a', 'b', 'c']; //dummy movies
        //setMovies(testMovies); //set the state for movies

        //use fetch function to get data from url:
        //path 'moveis.json' works here as this component is injected into index.html and movies.json lives there too
        fetch('movies.json') //.then as this could take a while!
        .then(response => response.json()) //response is what's returned from the fetch, which we then return as json data
        .then(jsonData => setMovies(jsonData)); //then returned json data is passed into setMovies() to set the state for movies

    }, []); //sending empty array as 2nd arg as we dont want to provide any ibfo on when to repeat this effect (as we only want it working once)
    */

    const handleGenreChange =(event)=>{
        setGenre(event.target.value); //set search term with input field value
    };

    const handleRatingChange =(event)=>{
        setRating(event.target.value); //set search term with input field value
    };

    const handleSearchChange =(event)=>{
        setSearchTerm(event.target.value); //set search term with input field value
    };

    //------------

    const matchesGenre = (movie, genre) =>{
        return genre === "All Genres" || movie.genre.toLocaleLowerCase() === genre.toLocaleLowerCase();
    };

    const matchesSearchTerm = (movie, searchTerm) =>{
        return movie.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    };

    const matchesRating = (movie, rating) =>{
        switch(rating){
            case 'All':
                return true;
            case 'Good':
                return movie.rating >=8;
            case 'Okay':
                return movie.rating >=5 && movie.rating <8;
            case 'Bad':
                return movie.rating <5;
            default:
                return false;
        }
    };

    //------------

    //filter each movie where moviematches genre and then rating and then searchterm
    const filteredMovies = movies.filter(movie => 
        matchesGenre(movie, genre) &&
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm)
    )

    return(
        <div>

            <input 
                type='text' 
                placeholder='I be placeholder...' 
                className='search-input'
                value={searchTerm} //input value will be search term. 
                onChange={handleSearchChange} //+++++++++IMPORTANT: whenever something new is added, change search term to that. this forces UI to get updated, because it's changing a state
            />

            <div className='filter-bar'>
                <div className='filter-slot'>
                    <label>Genre</label>
                    <select className='filter-dropdown' value={genre} onChange={handleGenreChange}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>
                <div className='filter-slot'>
                    <label>Rating</label>
                    <select className='filter-dropdown' value={rating} onChange={handleRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Okay</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className='movies-grid'>
                {
                    //movies.map(movie => ( -------------shows all movies
                    filteredMovies.map(movie => (
                        //add movie card with parameter of movie, and a unique id for targeting
                        // remember .includes() returns boolean of if arg is included
                        <MovieCard movie={movie} isWatchlisted={watchlist.includes(movie.id)} toggleWatchlist={toggleWatchlist} key={movie.id}></MovieCard> 
                    ))
                }
            </div>

        </div>
    );
};