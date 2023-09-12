import React, {useEffect } from 'react'

import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error')
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });

  }, [])

  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-48 mx-auto md:mx-0" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      <div className='flex'>
{user &&  ( <><img className='w-12 h-12 my-6 ' src={user?.photoURL} alt="user" /><button className='m-2 text-white text-lg' onClick={handleSignout}>SignOut</button></>)}
       
      </div>

    </div>


  )
}


export default Header;
