
import './App.css';
import React, { Component } from 'react'
import BackgroundVideo from './components/BackgroundVideo'
import Timer from './components/Timer'
import TimeSelect from './components/TimeSelect'
import SoundPicker from './components/SoundPicker'
// import soundURL from './sounds/rain.mp3'
import play from './svg/play.svg'
import pause from './svg/pause.svg'
import rain from './sounds/rain.mp3'
import beach from './sounds/beach.mp3'
import forest from './sounds/night-ambience-loop.mp3'
import rainVideo from './video/rain.mp4'
import beachVideo from './video/beach.mp4'
import forestVideo from './video/Starry-Lake-Timelapse.mp4'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlay: false,
      duration: 60,
      timeLeft: 60,
      imgURL:play,
      soundURL: beach,
      videoURL: beachVideo
    }
    this.audioRef = React.createRef();
    this.videoRef = React.createRef();
  }

  componentDidUpdate () {
    if (this.state.isPlay && this.state.duration !== 0) {
      this.audioRef.current.play();
      this.videoRef.current.play();      
    } else if (!this.state.isPlay) {
      this.audioRef.current.pause();
      this.videoRef.current.pause()
    }
    console.log(this.state.duration)
    console.log(this.state.timeLeft)
  }
  
  //handle audio play
  handlePlay (e) {
    if (!this.state.isPlay){
      // this.audioRef.current.play();
      // this.videoRef.current.play()
      this.setState({
        isPlay: true,
        imgURL: pause
      })
    } else if(this.state.isPlay) {
      // this.audioRef.current.pause();
      // this.videoRef.current.pause()
      this.setState({
        isPlay: false,
        imgURL: play
      })
    }

  }
  
  handleTimeUpdate(e) {
    let currentTime = this.audioRef.current.currentTime;
    
    console.log(currentTime)
    // console.log(currentTime)
    //the number of time has passed
    let elapsed = Math.floor(this.state.duration - currentTime);
    // animate circle prepration
    const outline = document.querySelector('.moving-outline circle')
    const outlineLength = outline.getTotalLength();
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //Animate the circle
    let progress = outlineLength - (currentTime / this.state.duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate the text
    this.setState({
      timeLeft:elapsed
    })
    // timeDisplay.textContent = `${minutes}:${seconds}`;
    // handle timer finished, pause video, set state,set timer to zero
    if (currentTime > this.state.duration) {
      // this.audioRef.current.pause();
      this.setState({
        isPlay: false,
        imgURL: play,
        timeLeft: this.state.duration
      })
      this.audioRef.current.currentTime = 0
    } 
}

onValueChange(e) {
  let duration
  try {
  if (e.target.value !== ''){
    duration = parseInt(e.target.value) * 60
  }
  else if (e.target.value === ''){
    duration = ''
  }
  if(this.state.duration >= 0 && this.state.duration <3600 && !this.state.isPlay && this.state.timeLeft + duration -this.state.duration>0) {
    this.setState(prevState => ({
      duration: duration,
      timeLeft: (prevState.timeLeft + (duration - prevState.duration))
    }))
  } 
}
catch(err) {
  console.log(err)
}
}


decreaseTime() {
  // console.log("minus 1")
  if (this.state.duration > 0 && !this.state.isPlay && this.state.timeLeft -60 >0) {
    this.setState({
      duration: this.state.duration - 60,
      timeLeft: this.state.timeLeft - 60
    });
  }
}

increaseTime() {
  // console.log("increase 1")
  if (this.state.duration < 3600 && !this.state.isPlay) {
    
    this.setState({
      duration: this.state.duration + 60,
      timeLeft: this.state.timeLeft + 60
    });
  }
}

setUpTime(e) {
  console.log(e.target.getAttribute('data-time'));
  if (!this.state.isPlay) {
  let newDuration = parseInt(e.target.getAttribute('data-time'));
  this.setState({
    duration: newDuration,
    timeLeft: newDuration
  })
  this.audioRef.current.currentTime = 0;
  }
}

selectSound(sound) {
  if (sound === "rain") {
    this.setState({
      soundURL: rain,
      videoURL: rainVideo
    })
  }else if (sound === "beach") {
    this.setState({
      soundURL: beach,
      videoURL: beachVideo
    })
  }else if (sound === "forest"){
    this.setState({
      soundURL: forest,
      videoURL: forestVideo
    })
  }
  this.audioRef.current.load();
  this.videoRef.current.load();
  
}

  render() {
    return (
      <div className="app">

        <BackgroundVideo isPlay = {this.state.isPlay}
         ref={this.videoRef} 
         videoURL = {this.state.videoURL}
         />
        <TimeSelect isPlay = {this.state.isPlay}
          duration = {this.state.duration}
          decreaseTime = {() => this.decreaseTime()}
          increaseTime = {() => this.increaseTime()}
          setUpTime = {(e) => this.setUpTime(e)}
          onValueChange = {(e) => this.onValueChange(e)}
        />
        <audio className="song" loop onTimeUpdate = {(e) => this.handleTimeUpdate(e) }
          ref={this.audioRef}
        >
          <source src={this.state.soundURL} />
        </audio> 
        <Timer duration = {this.state.duration} 
          handlePlay ={(e)=> this.handlePlay(e)} 
          imgURL = {this.state.imgURL}
          timeLeft = {this.state.timeLeft}
          />
        <SoundPicker selectSound = {(sound) => this.selectSound(sound)}/>
      </div>
    );
  }
}

export default App;
