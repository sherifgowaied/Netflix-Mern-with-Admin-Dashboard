import "./newList.css";

import {useContext, useEffect, useState} from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
// import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list,setList] =useState(null)
  const history = useHistory()
 
  const {movies,dispatch : dispatchMovie} = useContext(MovieContext)
  const { dispatch } = useContext(ListContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e)=>{
    const value = e.target.value;
    setList({...list,[e.target.name]:value})
  }
  

  const handleSelect = (e)=>{
    const value = Array.from(e.target.selectedOptions,(option)=>(option.value))
    setList({...list,[e.target.name]:value})
    
  }
  

  const handleSubmit = (e)=>{
    e.preventDefault()
    createList(list,dispatch)
    history.push("/lists")
  }
 //console.log(list)
  
  // console.log(img)
  // console.log(video)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      
      <form className="addProductForm">
      <div className="formLeft">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" id="title" placeholder="Popular Movies" name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Type</label>
         <select name="type" onChange={handleChange} >
          <option>Type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
         </select>
        </div>    
        </div>
        <div className="formRight">
        <div className="addProductItem">
          <label>Content</label>
         <select multiple name="content" onChange={handleSelect}  style={{ height: "280px" }} >
          
          {movies.map((movie)=>(
            <option key={movie._id} value={movie._id}>{movie.title }</option>
          ))}
          
         </select>
        </div>    
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
