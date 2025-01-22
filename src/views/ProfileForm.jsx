import React, { createRef, useState } from "react";
import "./ProfileForm.css"
import axiosClient from "../axios-client";
import { Navigate, useNavigate } from "react-router-dom";
export default function ProfileForm({ closePopup }){
    const prefixRef = createRef();
    const firstNameRef = createRef();
    const LastNameRef = createRef();
    const roleRef = createRef();
    const [image,setImage] = useState(null);
    const [message,setMessage] = useState(null);
    const [imagePrev, setImagePrev] = useState(null);
    const navigate = useNavigate();
    const defaultImage = "public/default_profile.png";

    const handleImgChange=(ev)=>{
        setImage(ev.target.files[0]);
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setImagePrev(reader.result)
        }
        reader.readAsDataURL(ev.target.files[0]);
    };
    const handleSubmit=(ev)=>{
        ev.preventDefault();    
        const formData = new FormData();
        formData.append("first_name", firstNameRef.current.value);
        formData.append("last_name", LastNameRef.current.value);
        formData.append("prefix", prefixRef.current.value);
        formData.append("role", roleRef.current.value);
        if (image) {
            formData.append("profile_image", image); // Append file
        }
            axiosClient.post('/profiles', formData)
        .then((response)=>{
            alert("Signup Success")
            navigate("/dashboard");
            closePopup();
        })
        .catch ((err)=>{
            setMessage(err?.response?.data)
        }) 
    }
    
  return (
    <div className="popup">
      <div className="popup-content">
      <h2>Create Your Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="img-div">
                <label htmlFor="imageUpload" style={{ cursor: "pointer", display: "block", textAlign: "center" }}>
                    <img src={imagePrev||defaultImage} alt="profile" width="100" style={{ borderRadius: "4%", border: "2px solid #ccc" }} />
                </label>
                <input 
                    type="file" 
                    id="imageUpload" 
                    onChange={handleImgChange} 
                    accept="image/*" 
                    style={{ display: "none" }} 
                />
                <p className="error-alert">{message?.profile_image}</p>
            </div>
            <div>
                <div className="col-auto">  
                    <input ref={prefixRef} type="text" className="form-control" placeholder="Mr" />
                    <p className="error-alert">{message?.prefix}</p>
                    <input ref={firstNameRef} type="text" className="form-control" placeholder="Enter your first name" />
                    <p className="error-alert">{message?.first_name}</p>
                </div>
                <div className="col-auto" >
                    <input ref={LastNameRef} type="text" className="form-control" placeholder="Enter your last name" />
                    <p className="error-alert" >{message?.last_name}</p>
                    <select ref={roleRef} type="text" className="form-control">
                        <option value="">Select a role</option>
                        <option value="lead"> Lead</option>
                        <option value="manager"> Manager</option>
                        <option value="developer"> Developer</option>
                    </select>
                    <p className="error-alert" >{message?.role}</p>
                </div>
                <button type="submit">Save Profile</button>

            </div>
        </form>
      </div>
    </div>
  );
}
