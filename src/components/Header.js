import React, { useEffect } from 'react'

import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLang } from "../utils/configSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)


  const handleSignout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error')
    });
  }
  const handleGPT = () => {
    dispatch(toggleGptSearchView());

  }
  const handleLanguageChange = (e) => {
    dispatch(changeLang(e.target.value));
  };
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
        {user  && (<>
        {showGptSearch ? (<select
            className="p-4 m-6 bg-gray-900 text-white rounded-sm w-40"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>): (null)}
          
          <button className='bg-indigo-700 text-white rounded-lg m-6 px-4' onClick={handleGPT} >{showGptSearch ?  "Home Page" : 'GPT Search'}</button>

          <img className='w-12 h-12 my-6 ' src={user?.photoURL} alt="user" />
          <button className='m-2 text-white text-lg rounded-lg m-6 px-4 bg-lime-800' onClick={handleSignout}>SignOut</button></>)}

      </div>

    </div>


  )
}


export default Header;
