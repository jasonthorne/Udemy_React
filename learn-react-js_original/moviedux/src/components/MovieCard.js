import React from 'react';
import '../styles.css';


//<MovieCard movie={movie}></MovieCard> - creating a movie component add movie property, which is whats passed in below
export default function MovieCard({movie, isWatchlisted, toggleWatchlist}){ //Note the need for this to be in braces :P
 
    //for handling triggeredd 'on error' events for images:
    const handleError = (event)=>{
        event.target.src = 'images/default.jpg'; //set src to be default image
    };

    const getRatingClass =(rating)=>{
        if (rating>=8){
            return 'rating-good';
        }else if(rating>=5){
             return 'rating-ok';
        }else{
            return 'rating-bad';
        }
    };

    return(
        //on error with image tag, handleError is called, passing it the event - NOTE: no ()
        //adding SECOND class to the movie card rating - dependent on rating score
        <div key={movie.id} className='movie-card'>
            <img src={`images/${movie.image}`} alt={movie.title} onError={handleError}></img>
            <div className='movie-card-info'>
                <h3 className='movie-card-title'>{movie.title}</h3>
                <div>
                    <span className='movie-card-genre'>{movie.genre}</span>
                    <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>{movie.rating}</span>
                </div>
                <label className='switch'>
                    <input type='checkbox' checked={isWatchlisted} onChange={() => toggleWatchlist(movie.id)}></input>
                    <span className='slider'>
                        <span className='slider-label'>{isWatchlisted ? "In  Watchlist": "Add to Watchlist"}</span>
                    </span>
                </label>
            </div>
        </div>
    );
}