import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

function GptMovieSuggestions() {
    const {gptMoviesNames,gptMoviesResult} = useSelector((store) =>  store.gpt);
    if(!gptMoviesNames) return null;
  return (
    <div className='p-4 m-4 bg-black  text-white z-40'>
{(gptMoviesNames|| []).map((gptMoviesName, index)=> ( <MovieList key={gptMoviesName} title={gptMoviesName} movies={gptMoviesResult[index]}></MovieList>))}  
    </div>
  )
}

export default GptMovieSuggestions;
