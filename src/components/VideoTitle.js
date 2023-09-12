import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
    <h1 className='text-4xl font-bold text-white'>{title}</h1>
    <p className='w-2/5 text-white my-2'> {overview}</p>
    <div>
        <button className='text-black bg-white px-6 py-2 rounded-lg hover:bg-opacity-80'> ▶️ Play</button>
        <button className='text-white bg-gray-500 px-6 py-2 rounded-lg mx-6 my-2 bg-opacity-80 hover:bg-opacity-95'> More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle;
