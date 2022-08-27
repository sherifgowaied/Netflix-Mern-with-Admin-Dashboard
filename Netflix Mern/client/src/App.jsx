import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./app.scss"
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
  } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AuthContext); 
  return (
  <div>
    <BrowserRouter>
      <Routes >

        <Route path="/" exact element={ user ?  <Home  /> : <Navigate to="/register"/>} />
        <Route path="/login" element={ !user ? <Login  /> : <Navigate to="/" /> } />
        <Route path="/register" element={ !user ? <Register  /> : <Navigate to="/"/>} />
        {user && (
          <>
        <Route path="/movies" element={<Home type="movie" />} />
        <Route path="/series" element={<Home type="series"  />} />
        <Route path="/watch" element={<Watch  />} />
        </>
        )}
        
        
      </Routes>
    
    </BrowserRouter>
  </div>
  );
};

export default App;