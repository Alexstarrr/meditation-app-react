import React from 'react';
import video from '../video/beach.mp4'
const BackgroundVideo = React.forwardRef((props,ref) => (
    <div className="vid-container">
        <video className="bgVideo" loop muted ref = {ref} >
            <source src = {props.videoURL}  type = "video/mp4"/>
        </video>
    </div>
))
//     render() {
//         // let isPlay = {};
//         // if (this.props.isPlay) isPlay['autoPlay'] = 'autoPlay'
//         // console.log(isPlay)
//         return(
            

//         )
//     }
// }

export default BackgroundVideo;