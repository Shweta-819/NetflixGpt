import React from 'react'
import GptSeachBar from './GptSeachBar'
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG } from '../utils/constants';
const GptSearch = () => {
  return (
    <div>
    <div className="fixed -z-10 ">
          <img className="w-screen object-cover " src={BG} alt="bg" />
      </div>
      <GptSeachBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch
