import React, { Component } from 'react';
import './main.css';
import Counter from '../../components/counter/counter';
import { EASY } from '../../components/constants'

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  input : '',
                        //correct : false,
                        //gameStarted: false, 
                        operator: 'ADD',
                        gameEnded: false,
                        attempted: 0,
                        score: 0,
                        topNum: Math.floor(Math.random() * EASY + 1),
                        bottomNum : Math.floor(Math.random() * EASY + 1)  };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        let answer;
        switch (this.state.operator) {
            case 'ADD':
                answer = this.state.topNum + this.state.bottomNum;
                break;
            case 'DIVIDE':
                answer = this.state.topNum / this.state.bottomNum;
                break;
            case 'SUBTRACT':
                answer = this.state.topNum - this.state.bottomNum;
                break;
            case 'MULT':
                answer = this.state.topNum * this.state.bottomNum;
                break;
            default:
                break;
        }
        let newScore = answer === Number(this.state.input) ? this.state.score + 1 : this.state.score;
        
        this.setState({ attempted: this.state.attempted + 1,
                        score: newScore,
                        input: '',
                        topNum: Math.floor(Math.random() * EASY + 1),
                        bottomNum: Math.floor(Math.random() * EASY + 1) });
        console.log('current score: ' + this.state.score);
    }

    handleChange(e) {
        this.setState({ input : e.target.value})
    }

    handleKeyPress = e => {
        if (e.keyCode === 13) this.handleClick(e);
    }

    timeOver = () => {
        const { score, attempted } = this.state;
        console.log(`final score is ${score} out of ${attempted}`);
        this.setState({ gameEnded: true });
    }
    render() { 
        
        const { topNum, bottomNum, score, attempted } = this.state;
        let endMsg = `final score is ${score} out of ${attempted}: ${(score*100/attempted).toFixed(1)}%`;
        return ( 
        
        <div id='q-container'>
        
                <Counter timeEnd={this.timeOver}/>
                <div id = 'top'>{topNum}</div>
                <div id = 'bottom'>{'+ ' + bottomNum}</div>
                <div id = 'guess-wrapper'>
                    <input  id='guess'
                            ref={input => input && input.focus()} 
                            value={this.state.input}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyPress}
                            ></input>
                    <button id='answer-btn'
                            onClick = {this.handleClick}>submit</button>
                </div>
                <div id='game-end-message'>{this.state.gameEnded ? 
                endMsg : ''}</div>
        </div> );
    }
}
 
export default Main;