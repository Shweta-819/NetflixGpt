import React from 'react';
// import { IMG_CDN } from '../utils/constants';

const MovieCard = ({poster_path}) => {
    if(!poster_path) return null;
    // console.log(poster_path)
  return (
    <div className='w-32 md:w-48 p-2'>
   <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='movie_poster'></img>
    </div>
  )
}

export default MovieCard;
