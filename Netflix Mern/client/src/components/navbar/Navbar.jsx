import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
const Navbar = () => {
    const [isScrolled , setIsScrolled] = useState(false )
    const {dispatch} =useContext(AuthContext)
    window.onscroll = ()=>{
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null);
    }
    //console.log(isScrolled)



  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt=""  />
                <Link to="/" className="link" >
                <span>Home</span>
                </Link>
                <Link to="/series" className="link" >
                <span className="navbarmainLinks">Series</span>
                </Link>
                <Link to="/movies"  className="link">
                <span className="navbarmainLinks">Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <SearchIcon  className="icon" />
                <span>KID</span>
                <NotificationsIcon className="icon" />
                <img
                    src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />    
                <div className="profile">
                <ArrowDropDownIcon  className="icon"/>
                <div className="options">
                    <span>Settings</span>
                    <span onClick={()=>dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar