import "./listItem.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
const ListItem = ({index , item}) => {
  const[isHovered,setIsHovered]=useState(false)
  const [movie,setMovie] = useState({})

  useEffect(()=>{
    const getMovie = async()=>{
      try {
        const res =await axios.get("/movies/find/"+item,{ 
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzAzMzJjZGUzODZiZDc0YWFjYmMxYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njc5MDMzMSwiZXhwIjoxNjU3MjIyMzMxfQ.qd9EgGkYnwh9TDg38Zrsz0HSjH6MMpMzs_nmT_j8CBs"
          }
        })
        setMovie(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getMovie()
  },[item])
  
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
    <div className="listItem"
    style={{left: isHovered && index * 225 -50 +index * 2.5}}
     onMouseEnter={()=>setIsHovered(true)}
      onMouseLeave={()=>setIsHovered(false)}
      
      >
      <img 
        src={movie?.imgSm}
        alt="" />
        {isHovered && ( 
            <>
          <video src={movie.trailer} autoPlay={true} loop />
        <div className="itemInfo">
          <div className="info">
            <PlayArrowIcon className="icon" />
            <AddCircleIcon className="icon" />
            <ThumbUpOffAltOutlinedIcon className="icon"/>
            <ThumbDownOutlinedIcon className="icon" />
          </div>
        <div className="itemInfoTop">
          <span>1 hour 35 mintues</span>
          <span className="limit">+{movie.limit}</span>
          <span>{movie.year}</span>
        </div>
        <div className="desc">
       {movie.desc}
        </div>
        <div className="genre">{movie.genre}</div>
    </div>
    </>
    )}
    </div>
    </Link>
  )
}

export default ListItem