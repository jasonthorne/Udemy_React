import React from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function Watchlist({movies, watchlist, toggleWatchlist}){ //args passed as props where component is defined (in App.js)
    return(
        <div>
            <h1 className='title'>Here be Watchlist</h1>
            <div className='watchlist'>
                {
                    //for each id in watchlist, grab it's move then return a movie component with it's values:
                    watchlist.map(id => {
                        const targetMovie = movies.find(movie => movie.id === id);
                        return <MovieCard key={id} movie={targetMovie} toggleWatchlist={toggleWatchlist} isWatchlisted={true} />
                    })
                }
            </div>
        </div>
    )
}