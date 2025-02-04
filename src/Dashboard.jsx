import React, { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import ProfileForm from "./views/ProfileForm";
import Profile from "./views/Profile";
import "./Dashboard.css"
const DashBoard=()=>{
    const [profile, setProfile] = useState(null)
    const [showPopup, setShowPopup] = useState(false)
    const [profileToggel, setProfileToggel] = useState("hidden-profile-toggel")

    useEffect(()=>{
        axiosClient.get('/profiles')
        .then((response)=>{
            setProfile(response.data)
        })
        .catch((err)=>{
            setShowPopup(true);
        })
    },[])

    const openProfile=()=>{
        if (profileToggel==="hidden-profile-toggel"){
            setProfileToggel("profile-toggel")
        }
        else{
            setProfileToggel("hidden-profile-toggel")
        }
    }
    return(
        <>
            {showPopup && <ProfileForm closePopup={()=> setShowPopup(false)}/>}
            <div className="ls-slider">
                <div className= {profileToggel}>
                    <Profile profile={profile}/>
                </div>
                <div className="profile-folder" onClick={openProfile}>{}</div>
            </div>
        </>
    );
}

export default DashBoard;