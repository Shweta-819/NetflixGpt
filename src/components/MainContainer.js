import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackgroud from './VideoBackgroud'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    if(!movies) return ;
    const movie = movies[0]
    console.log(movie);
    const {original_title, overview, id }= movie;
    console.log(original_title)

    // const filterData = movie

return (
    <div>
    <VideoTitle title={original_title} overview={overview}/>
    <VideoBackgroud id={id}/>
    </div>
  )
}

export default MainContainer
