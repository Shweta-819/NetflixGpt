import React, { useRef, useState } from 'react'
import validatedata from '../utils/validatedata';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const toggle = () => {
    setIsSignIn(!isSignIn)
  };

  const handleform = () => {
    const message = validatedata(email.current.value, password.current.value);
    console.log(password.current.value)
    setErrorMessage(message);

    if (message) return;
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: fullname.current.value, photoURL: "https://avatars.githubusercontent.com/u/110809943?s=400&u=198799f65e3a9414b8bb2dff80cd30935f2a02ba&v=4"
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))  
            navigate('/browse')
            console.log(user)

          }).catch((error) => {
            setErrorMessage(error.message)
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + " " + errorMessage)
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate('/browse')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage)
        });

    }
  }
  return (
    <>
      <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-screen">
        <img className="w-48" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      </div>
      <from className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className='p-4 text-3xl' >{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && <input ref={fullname} className="p-4 my-2 w-full rounded-lg  text-black" type="text" placeholder='Full Name'></input>}
        <input ref={email} className="p-4 my-2 w-full rounded-lg text-black" type="text" placeholder='Email address'></input>
        <input ref={password} className="p-4 my-2 w-full rounded-lg text-black" type="password" placeholder='Password'></input>
        <p className="text-red-500 text-sm">{errorMessage}</p>
        <button className="p-4 my-6 w-full rounded-lg bg-red-700 cursor-pointer" onClick={handleform}>{isSignIn ? "Sign In" : "Sign Up"}</button>
        <p onClick={toggle} className='cursor-pointer'>{isSignIn ? "New to Netflix?   Sign Up Now" : "Already registered.. Sign In Now"}</p>
      </from>
    </>
  )
}

export default Header
