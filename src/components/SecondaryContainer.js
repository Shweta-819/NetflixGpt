import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

    const movies = useSelector((store) => store.movies)
    // console.log(movies, 'movies')
  return (       
  <div className='mt-0 md:-mt-52  pl-5 md:pl-10 z-10 relative bg-black'>
        <MovieList title={"Now playing"} movies={movies?.nowPlayingMovies}></MovieList>
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}></MovieList>
        <MovieList title={"Popular"} movies={movies?.popularMovies}></MovieList>
        <MovieList title={"Upcoming"} movies={movies?.upcomingMovies}></MovieList>
    </div> 
    
  )
}

export default SecondaryContainer
