import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername]=useState("");
  const navigate = useNavigate()

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef()

  const navigateToLogin = () => {
   
    navigate('/login');
  };

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleEmailPassword = ()=>{
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
  }

  const handleFinish = async (e) => {
    e.preventDefault()
    
    try{
      await  axios.post("auth/register",{username:username
        ,email:email,
        password:password
      })
      navigate("/login")
  }catch(err){
    console.log(err);
  }
  };
  console.log(email,password,username)
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className="loginButton" onClick={navigateToLogin}>Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="username" onChange={handleEmailPassword} ref={usernameRef} />
            <input type="password" placeholder="password" onChange={handleEmailPassword} ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}