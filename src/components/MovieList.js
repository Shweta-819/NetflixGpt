import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {

  return (
    <div className='py-4'>
    <h2 className='text-white font-bold text-2xl py-2'>{title}</h2>
    <div className='flex overflow-auto'>

          <div className='flex'>
              {movies?.map((movie) => (<MovieCard key={movie.id} poster_path={movie.poster_path} />))}
          </div>

      </div>
      </div>
  )
}

export default MovieList
