import React, { useRef } from 'react'
import { API_OPTIONS, BG } from '../utils/constants';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import lang from '../utils/langConstants';
import openai from '../utils/openAi';


const searchMovieTmdb = async(movie) => {
      const movieData = fetch(`https://api.themoviedb.org/3/search/${movie}?include_adult=false&language=en-US&page=1`, API_OPTIONS)
      const json = await movieData.json();
      return json;
}

const GptSeachBar = () => {

    const langkey = useSelector((store)=> store.config.lang)
    const inputtext= useRef(null);

    

    const handleGpt = async() => {
    const gptquery = `Act as a movie recommendation system and suggest some movies 
    for the query: ${inputtext?.current.value}. Only give me names of 6 movies comma 
    seperated like the example given ahead. Example: Gadar, Don, Heraferi, Koi mil gya, Golmal`
        const gptresult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptquery }],
            model: 'gpt-3.5-turbo',
    });
        
        //   console.log(gptresult?.choices[0].message.content);

        const movieRes= gptresult?.choices[0].message.content.split(',')
        const promiseArray = (movieRes)?.map((movie)=> searchMovieTmdb(movie))
        const result = await Promise.all(promiseArray);
        console.log(result);

    }
  return (
   
     <><div className="absolute">
          <img className="h-screen w-screen object-cover" src={BG} alt="bg" />
      </div><div className='pt-[10%] flex justify-center'>
              <form className='bg-black bg-opacity-100 w-1/2 flex rounded-lg z-30' onSubmit={(e)=> e.preventDefault()}>
                  <input ref={inputtext} type="text" placeholder={lang[langkey].gptSearchPlaceholder} className='p-4 m-4 flex-1'></input>
                  <button className='bg-red-700 rounded-lg flex-6 m-4 p-4 text-white' onClick={handleGpt}>{lang[langkey].search}</button>
              </form>
          </div></>
  )
}

export default GptSeachBar
