import React from 'react'
import rain from '../images/3217126.svg'
import beach from '../images/Beach-512.png'
import forest from '../images/15._tree_moon_forest_star_nature-512.png'

class SoundPicker extends React.Component {
    
    handleClick(e) {
        let sound = e.target.closest('.soundBtn').getAttribute('data-sound')
        this.props.selectSound(sound)
    }
    
    render() {
        return (
            <div className="sound-picker">
            <button className = "soundBtn" data-sound="rain" onClick = {(e)=> this.handleClick(e)}>
                <img src={rain} alt="rain" /> 
            </button>
            <button className = "soundBtn" data-sound="beach" onClick = {(e)=> this.handleClick(e)}>
                <img src={beach} alt="rain" />
            </button>
            <button className = "soundBtn" data-sound="forest" onClick = {(e)=> this.handleClick(e)}>
                <img src={forest} alt="rain" /> 
            </button>
        </div>
        )
    }
}

export default SoundPicker;