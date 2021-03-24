import React from 'react'

class TimeSelect extends React.Component {



    handleClickTime(e){
        this.props.setUpTime(e)
    }
    
    render() {
        const btnClassName = this.props.isPlay ? 'disable' : '';
        return (
            <div className="time-select">
                <div className="settings">
                    <div className="settings-section">
                        <label id="session-label">Session Length</label>
                        <div>
                            <button className={btnClassName} id="session-decrement" onClick={this.props.decreaseTime}>-</button>
        <input type = "number" value = {this.props.duration/60} onChange = {this.props.onValueChange}></input>

                            <button className={btnClassName} id="session-increment" onClick={this.props.increaseTime}>+</button>
                        </div>
                        </div>
                    </div>
                <button className={btnClassName} data-time="600" onClick = {(e)=>this.handleClickTime(e)}>10 Minutes</button>
                <button className={btnClassName} data-time="1500" onClick = {(e)=>this.handleClickTime(e)}>25 Minutes</button>
                <button className={btnClassName} data-time="2400" onClick = {(e)=>this.handleClickTime(e)}>40 Minutes</button>            
            </div>
            
        )
    }
}

export default TimeSelect;