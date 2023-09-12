import React, {useEffect } from 'react'

import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { LOGO } from '../utils/constants';

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        navigate('/browse')
      } else {
        dispatch(removeUser());
        navigate('/')
      }
    });
return () => unsubscribe();
  }, [])

  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-48 mx-auto md:mx-0" src={LOGO} alt="logo" />
      <div className='flex'>
{user &&  ( <><img className='w-12 h-12 my-6 ' src={user?.photoURL} alt="user" /><button className='m-2 text-white text-lg' onClick={handleSignout}>SignOut</button></>)}
       
      </div>

    </div>


  )
}


export default Header;
