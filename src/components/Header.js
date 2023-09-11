import React, { useState } from 'react'

const Header = () => {
    const [isSignIn, setIsSignIn] = useState(true)

    const toggle = () =>{
        setIsSignIn(!isSignIn)
    };
  return (
    <>
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black">
    <img className="w-48"src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
    </div>
    <from className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
    <h1 className='p-4 text-3xl' >{isSignIn ? "Sign In" : "Sign Up" }</h1>
    {!isSignIn && <input className="p-4 my-2 w-full rounded-lg" type="text" placeholder='Full Name'></input>}
    <input className="p-4 my-2 w-full rounded-lg" type="text" placeholder='Email address'></input>
    <input className="p-4 my-2 w-full rounded-lg" type="password" placeholder='Password'></input>
    <button className="p-4 my-6 w-full rounded-lg bg-red-700 cursor-pointer" >{isSignIn ? "Sign In" : "Sign Up" }</button>
    <p onClick={toggle} className='cursor-pointer'>{isSignIn ? "New to Netflix?   Sign Up Now" : "Already registered.. Sign In Now" }</p>
    </from>
    </>
  )
}

export default Header
