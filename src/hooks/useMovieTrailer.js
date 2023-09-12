import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';


const useMovieTrailer = (id) => {
    const dispatch = useDispatch();

    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
        const response = await data.json();

        const filterData =  response.results.filter((video) => video.type === "Trailer")
        const trailer = filterData.length ? filterData[0] : response.results[0]
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideo();
    }, [])
}

export default useMovieTrailer;
