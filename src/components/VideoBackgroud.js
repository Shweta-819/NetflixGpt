import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgroud = ({ id }) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    useMovieTrailer(id);
    
    return (
       
        <div className="w-screen aspect-auto md:pt-0 pt-[35%] bg-black">
            <iframe className="w-screen aspect-video" src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    )
};

export default VideoBackgroud;
