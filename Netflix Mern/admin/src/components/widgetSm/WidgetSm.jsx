import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"

export default function WidgetSm() {
  const[newUsers ,setNewUsers ] = useState()
  useEffect(()=>{
    const getNewUsers = async()=>{
      try {
        const res = await axios.get('/users?new=true',{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzAzMzJjZGUzODZiZDc0YWFjYmMxYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njc5MDMzMSwiZXhwIjoxNjU3MjIyMzMxfQ.qd9EgGkYnwh9TDg38Zrsz0HSjH6MMpMzs_nmT_j8CBs"
          }
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNewUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers && newUsers.map((user,i)=>(
        <li className="widgetSmListItem" key={i+284}>
          <img
            src={user.profilePic || "https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
           
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))}
      </ul>
    </div>
  );
}
