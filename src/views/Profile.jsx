import React, { useEffect, useState } from "react";
import './Profile.css'
import axiosClient from "../axios-client";
export default function Profile({profile}){
    const [projects,setProject] = useState([]);
    useEffect(()=>{
        axiosClient.get('/projects')
        .then((response)=>{
            setProject(response.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])
    if (profile){
        const data = profile?.data?.attributes
        const fullName = `${data?.prefix} ${data?.first_name} ${data?.last_name}`
        return(
            <>
                <div className="profile-main">
                    <div className="pf-logo">
                        <img src={data?.profile_image} alt="profile" />
                        <h5>{fullName}</h5>
                        <p><span>{data?.role}</span></p>
                    </div>
                    <div>

                    </div>
                </div>
            </>
        );
    }
}