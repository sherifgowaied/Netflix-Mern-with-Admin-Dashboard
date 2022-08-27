import React, { useEffect, useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists] = useState([])
  const [genre,setGenre]=useState(null)
  useEffect(()=>{
    const getRandomLists = async()=>{
      
      try{
        const res =await axios.get(`lists${type ? "?type="+type :""}${genre ? "&genre="+genre : ""}`,{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzAzMzJjZGUzODZiZDc0YWFjYmMxYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njc5MDMzMSwiZXhwIjoxNjU3MjIyMzMxfQ.qd9EgGkYnwh9TDg38Zrsz0HSjH6MMpMzs_nmT_j8CBs"
          }
        }
        );
        //console.log(res.data)
        setLists(res.data)

      }catch(error){
        console.log(error)
      }
      
    }
    getRandomLists()
    
  },[type, genre])
  
  return (
    <div className="home">
       <Navbar />
       <Featured type={type} setGenre={setGenre}/> 
       {lists ? lists.map((list)=>(
        <List list={list} key={list._id} />
       )
       ) : ""}
       
       
    </div>
  )
}

export default Home