import "./login.css"
import  { useState , useContext } from "react"
// import { AuthContext } from "../../context/authContext/AuthContext"
import { login } from "../../context/authContext/apiCalls"
import { AuthContext } from "../../context/authContext/AuthContext"
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {isFetching,dispatch}=useContext(AuthContext)
    const handleLogin = (e)=>{
        e.preventDefault()
        login({ email, password }, dispatch);
    }
  return (
    <div className="login">
        <form className="loginForm">
            <input className="loginInput" type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <input className="loginInput" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={isFetching}  className="loginButton">Login</button>
        </form>
    </div>
  )
}

export default Login