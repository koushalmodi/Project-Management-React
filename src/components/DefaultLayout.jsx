import React from "react";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
const DefaultLayout=()=>{
   const {user, token} = useStateContext() ;
   const navigate = useNavigate();

   if(!token){
    return <Navigate to = "/login"/>
   }
   useEffect(()=>{
    axiosClient.get('/profiles')
    .catch((err)=>{
        console.log(err)    
        navigate('/profile')
    })
},[])
    return(
        <>
            <Outlet/>
        </>
    );
}

export default DefaultLayout;   