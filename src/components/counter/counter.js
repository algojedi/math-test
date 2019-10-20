import React from 'react';
import './counter.css';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 60,
            timerTime: 60 
        };
    }
    startTimer = () => {
        this.setState({
            timerOn: true
            // timerTime: this.state.timerTime,
            // timerStart: this.state.timerTime
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 1;
            if (newTime === 0) {
                clearInterval(this.timer);
                this.setState({
                    timerTime: newTime,
                    timerOn: false
                })
                alert("Countdown ended")
            }
            else {
                this.setState({
                    timerTime: newTime,
                });
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    }

    resetTimer = () => {
        if (this.state.timerOn === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    }
    
    render() { 
        const { timerStart, timerOn, timerTime } = this.state;
        
        return ( 
        <div>
                {timerOn === false &&
                    (timerTime === timerStart) && (
                        <button onClick={this.startTimer}>Start</button>
                    )}
                {timerOn === true && timerTime >= 0 && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {(timerOn === false || timerTime < 60) &&
                    (timerStart !== timerTime) && (
                        <button onClick={this.resetTimer}>Reset</button>
                    )}
            <h1> {timerTime} </h1>

        </div> );
    }
}
 
export default Counter;