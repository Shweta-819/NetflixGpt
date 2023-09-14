import React, { useRef } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import lang from '../utils/langConstants';
import openai from '../utils/openAi';
import { useDispatch } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';




const GptSeachBar = () => {

    const dispatch = useDispatch();
    const langkey = useSelector((store)=> store.config.lang)
    const inputtext= useRef(null);
    const searchMovieTmdb = async(movie) => {
        // const movieData = fetch(`https://api.themoviedb.org/3/search/${movie}?include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
              movie +
              "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
          );
        const json = await data.json();
        return json;
  }
    

    const handleGpt = async() => {
    const gptquery = `Act as a movie recommendation system and suggest some movies 
    for the query: ${inputtext?.current.value}. Only give me names of 6 movies comma 
    seperated like the example given ahead. Example: Gadar, Don, Heraferi, Koi mil gya, Golmal`
        const gptresult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptquery }],
            model: 'gpt-3.5-turbo',
    });
        

        const movieRes= gptresult?.choices[0].message.content.split(',')
        const promiseArray = (movieRes)?.map((movie)=> searchMovieTmdb(movie))
        const movieResult = await Promise.all(promiseArray);
        console.log(movieResult)
        const result = movieResult.map((movie, index)=>(movie.results))
        console.log(result);
        dispatch(addGptMovieResult({gptMoviesNames:movieRes ,gptMoviesResult:result}));

    }
  return (
   
     <>
     <div className='pt-[10%] flex justify-center'>
              <form className='bg-black bg-opacity-100 w-1/2 flex rounded-lg z-30' onSubmit={(e)=> e.preventDefault()}>
                  <input ref={inputtext} type="text" placeholder={lang[langkey].gptSearchPlaceholder} className='p-4 m-4 flex-1'></input>
                  <button className='bg-red-700 rounded-lg flex-6 m-4 p-4 text-white' onClick={handleGpt}>{lang[langkey].search}</button>
              </form>
          </div></>
  )
}

export default GptSeachBar
