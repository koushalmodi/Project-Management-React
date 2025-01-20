import axios from "axios";
import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

const Signup=()=>{
    const emailRef = createRef();
    const passwordRef = createRef();
    const [message, setMessage] = useState(null);
    const {setUser, setToken} = useStateContext();
    const onSubmit=(ev)=>{
        ev.preventDefault();
        const payload={
            user:{
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
        }
        const headers = {
            'Content-type': 'application.json'
        }
        axios.post("http://localhost:3000/signup",payload,headers )
        .then((response)=>{
            setUser(response.user)
            setToken(response.headers.authorization)
        })
        .catch((error)=>{
            setMessage(error?.response?.data?.status?.message?error.response.data.status.message:error.message)
        });
    }
    return (
        <div className="animated">
          <form className="g-3" onSubmit={onSubmit}>
            {message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }
            <h2 className="title">Signup To Your Account</h2>
            <div className="col-auto">
              <label htmlFor="staticEmail2" className="visually-hidden">Email</label>
              <input ref={emailRef} type="text" className="form-control" placeholder="Email" required/>
            </div>
            <div className="col-auto">
              <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
              <input ref={passwordRef} type="password" className="form-control" placeholder="Password" required/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">Create identity</button>
            </div>
            <div className="text-center">
              <p className="message">Already registered? <Link to="/login">Login to account</Link></p>
            </div>
          </form>
        </div>
      );
}

export default Signup;