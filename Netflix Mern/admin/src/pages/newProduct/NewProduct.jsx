import "./newProduct.css";

import {useContext, useState} from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
// import storage from "../../firebase";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCalls";

export default function NewProduct() {
  const [movie,setMovie] =useState(null)
  const [img,setImg] =useState(null)
  const [imgSm,setImgSm] =useState(null)
  const [imgTitle,setImgTitle] =useState(null)
  const [video,setVedio] =useState(null)
  const [trailer,setTrailer] =useState(null)
  const [uploaded,setUploaded] = useState(0)
 
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }
  const Upload = (items)=>{
    items.forEach((item)=>{
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
              console.log('SomeThing Went Wrong Good')
        }
        
        
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
            default:
              console.log('SomeThing Went Wrong')
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMovie((prev)=>{
           return { ...prev,[item.label]:downloadURL }
          });
          setUploaded((prev)=>(prev+1))
          console.log('File available at', downloadURL);

        });

      }
    );

    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    createMovie(movie,dispatch)
  }

  const  handleUpload= (e)=>{
    e.preventDefault()
    Upload([
      {file:img , label:"img"},
      {file:imgSm , label:"imgSm"},
      {file:imgTitle , label:"imgTitle"},
      {file:video , label:"video"},
      {file:trailer , label:"trailer"},
      
    ])
  }
  console.log(movie)
  // console.log(img)
  // console.log(video)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e)=>setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={(e)=>setImgTitle(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbinal image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={(e)=>setImgSm(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" id="title" placeholder="Amazing Spider Man" name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="desc" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="2009"  name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" name="limit"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre"  name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" name="" />
        </div>
        <div className="addProductItem">
          <label>is Series?</label>
          <select  id="isSeries" name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem" name="trailer" >
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e)=>setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem" name="video">
          <label>Video</label>
          <input  onChange={(e)=>setVedio(e.target.files[0])} name="video" type="file"  />
        </div>
        { uploaded === 5 ?
        (<button className="addProductButton" onClick={handleSubmit}>Create</button>)
        :
        (<button className="addProductButton" onClick={handleUpload}>Upload</button>)
        }
      </form>
    </div>
  );
}
