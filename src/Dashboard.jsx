import React, { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import { Navigate } from "react-router-dom";
import ProfileForm from "./views/ProfileForm";

const DashBoard=()=>{
    const [profile, setProfile] = useState(null)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(()=>{
        axiosClient.get('/profiles')
        .then((response)=>{
            setProfile(response.data)
        })
        .catch((err)=>{
            setShowPopup(true);
        })


    },[])

    return(
        <>
            <h1>Hello Dashboard</h1>
            {showPopup && <ProfileForm closePopup={()=> setShowPopup(false)}/>}
        </>
    );
}

export default DashBoard;