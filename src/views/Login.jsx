import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axios from "axios";
import './Login.css'

export default function Login() {

  const LoginSignUpForm = {
    // height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: '36vw',
    // width: "33%"
  };



  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      user:{
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
    }
    const headers = {
      'Content-type': 'application.json'
    }
    axios.post("http://localhost:3000/login", payload, headers)
    .then((response)=>{
      console.log(response)
      setUser(response.user)
      setToken(response.headers.authorization)
    })
    .catch((error)=>{
      setMessage(error.response?.data?error.response.data:error.message)
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
        <h2 className="title">Login To Your Account</h2>
        <div className="col-auto">
          <label htmlFor="staticEmail2" className="visually-hidden">Email</label>
          <input ref={emailRef} type="text" className="form-control" placeholder="Email" required/>
        </div>
        <div className="col-auto">
          <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
          <input ref={passwordRef} type="password" className="form-control" placeholder="Password" required/>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
        </div>
        <div className="text-center">
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </div>
      </form>
    </div>
  )
}