import React from 'react';
import './counter.css';
import { START_TIME } from './../constants';
import CustomButton from './../custom-button/custom-button.component'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: START_TIME,
            timerTime: START_TIME 
        };
    }
    startTimer = () => {
        this.props.gameStarted();
        this.setState({
            timerOn: true
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime - 1;
            if (newTime === 0) {
                clearInterval(this.timer);
                this.props.timeEnd();
                this.setState({
                    timerTime: newTime,
                    timerOn: false
                })
                //alert("Countdown ended")
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
            this.props.reset();
        }
    }
    
    render() { 
        const { timerStart, timerOn, timerTime } = this.state;
        
        return ( 
        <div>
                {timerOn === false &&
                    (timerTime === timerStart) && (
                    <CustomButton   onClick={this.startTimer}
                                    isTimerBtn='true'>Start</CustomButton>
                        
                    )}
                {timerOn === true && timerTime >= 0 && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {(timerOn === false || timerTime < START_TIME) &&
                    (timerStart !== timerTime) && (
                        <button onClick={this.resetTimer}>Reset</button>
                    )}
            <h1> {timerTime} </h1>

        </div> );
    }
}
 
export default Counter;


// {/* <button onClick={this.startTimer}>Start</button> */ }