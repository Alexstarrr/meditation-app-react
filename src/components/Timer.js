import React from 'react'


const formatCurrentTime = (currentTime) => {
    // console.log(currentTime)
    let minute = Math.floor(currentTime/60)
    if (minute < 10) minute = '0' + minute
    let second = currentTime - minute * 60
    if (second < 10) second = '0' + second 
    // console.log(`${minute}:${second}`)
    return `${minute}:${second}`
}

class Timer extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    
    handleClick (e) {
        this.props.handlePlay(e)
    }

    render() {
        return (
            <div className="player-container">

                <img src={this.props.imgURL} alt="play" className="play" onClick = {(e)=>this.handleClick(e)}/>
                <svg className="track-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="226.5" cy="226.5" r="216.5" stroke="white" strokeWidth="20"/>
                </svg>
                <svg className="moving-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="226.5" cy="226.5" r="216.5" stroke="#018EBA" strokeWidth="20"/>
                </svg>
                <h3 className="time-display">{formatCurrentTime(this.props.timeLeft)}</h3>                  
            </div>  
        )
    }
}

export default Timer;