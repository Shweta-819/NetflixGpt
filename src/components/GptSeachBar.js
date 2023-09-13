import React from 'react'
import { BG } from '../utils/constants';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import lang from '../utils/langConstants';

const GptSeachBar = () => {

    const langkey = useSelector((store)=> store.config.lang)
  return (
   
     <><div className="absolute">
          <img className="h-screen w-screen object-cover" src={BG} alt="bg" />
      </div><div className='pt-[10%] flex justify-center'>
              <form className='bg-black bg-opacity-100 w-1/2 flex rounded-lg z-30'>
                  <input type="text" placeholder={lang[langkey].gptSearchPlaceholder} className='p-4 m-4 flex-1'></input>
                  <button className='bg-red-700 rounded-lg flex-6 m-4 p-4 text-white'>{lang[langkey].search}</button>
              </form>
          </div></>
  )
}

export default GptSeachBar
