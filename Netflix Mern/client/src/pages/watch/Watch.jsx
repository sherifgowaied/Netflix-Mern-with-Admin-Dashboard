import "./watch.scss"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Watch = ()=>{
    const location = useLocation()
    const movie = location.movie
    const FakeVideo = "https://firebasestorage.googleapis.com/v0/b/netflix-24a93.appspot.com/o/items%2FWalt%20Before%20Mickey%20Movie%20%2030%20Second%20Trailer%20HD.mp4?alt=media&token=4ef36023-a8af-4451-a853-2be5bb2dcfec"
    return(
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlinedIcon />
                    Home
                </div>
            </Link>
            <video
            //  src={movie.video}
            src={FakeVideo}
             className="video"
            autoPlay
            progress
            controls />
        </div>
    )
}

export default Watch