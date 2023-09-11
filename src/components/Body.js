import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';


const Body = () => {
    const dispatch = useDispatch();
    const approuter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        }
    ]);
    useEffect(()=>{
      
onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid, email, displayName} = user;
    dispatch(addUser({uid: uid, email: email, displayName: displayName}))  
  } else {
    dispatch(removeUser())
  }
});

    }, [])
return (
    <div>
        <RouterProvider router={approuter}/>
    </div>


);
};

export default Body;
