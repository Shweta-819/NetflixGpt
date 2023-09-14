import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GptSearch from '../components/GptSearch';

const Browse = () => {

const showGptSearch = useSelector(store => store.gpt.showGptSearch)

 useNowPlayingMovies();
 usePopularMovies();
 useTopRatedMovies();
 useUpcomingMovies();


  
  return (
    <><Header />
    {showGptSearch ? (<GptSearch/>) : (<> <MainContainer />
    <SecondaryContainer /></>)}
   
    </>
  )
}

export default Browse;
