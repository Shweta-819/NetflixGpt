import React, {useState, useRef} from 'react';
import Header from './Header';
import validatedata from '../utils/validatedata';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
// import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG , AVATAR} from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();

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
            displayName: fullname.current.value, photoURL: AVATAR
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))  
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
          console.log(user)
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
    <Header/>
      <div className="fixed">
        <img className="h-screen w-screen object-cover" src={BG} alt="bg" />
      </div>
      <from className="absolute md:w-3/12 w-full p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className='p-4 md:text-3xl text-xl' >{isSignIn ? "Sign In" : "Sign Up"}</h1>
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

export default Login;
