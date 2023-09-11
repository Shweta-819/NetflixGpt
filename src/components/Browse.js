import React from 'react';
import {  signOut } from "firebase/auth";
import {auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Browse = () => {
const navigate = useNavigate();
const user = useSelector(store => store.user)
const handleSignout = () =>{
  signOut(auth).then(() => {
    navigate('/')
  }).catch((error) => {
    navigate('/error')
  });
}
  return (
   
  <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-screen flex justify-between">
        <img className="w-48" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
        <div className='flex'>

        <img className='w-12 h-12 my-6 ' src={user.photoURL} alt="user"/>
        <button className='m-2 text-white text-lg' onClick={handleSignout} >SignOut</button>
        </div>
       
   </div>

   
  )
}

export default Browse;
