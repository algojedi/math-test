import React, { Component } from 'react';
import './main.css';
import Counter from '../../components/counter/counter';
class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  input : '',
                        correct : false,
                        attempted: 0,
                        score: 0,
                        topNum: Math.floor(Math.random() * 50 + 1),
                        bottomNum : Math.floor(Math.random() * 50 + 1)  };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        const answer = this.state.topNum + this.state.bottomNum;
        let isCorrect;
        let newScore = answer === Number(this.state.input) ? this.state.score + 1 : this.state.score;
        
        this.setState({ attempted: this.state.attempted + 1,
                        score: newScore,
                        input: '',
                        topNum: Math.floor(Math.random() * 50 + 1),
                        bottomNum: Math.floor(Math.random() * 50 + 1) });
        console.log(this.state.score);
    }

    handleChange(e) {
        this.setState({ input : e.target.value})
    }

    handleKeyPress = e => {
        if (e.keyCode === 13) this.handleClick(e);
    }

    render() { 
        let top = this.state.topNum;
        let bottom = this.state.bottomNum;

        return ( 
        
        <div id='q-container'>
        
                <Counter/>
                <div id = 'top'>{top}</div>
                <div id = 'bottom'>{'+ ' + bottom}</div>
                <div id = 'guess-wrapper'>
                    <input  id='guess'
                            ref={input => input && input.focus()} 
                            value={this.state.input}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyPress}
                            ></input>
                    <button id='answer-btn'
                            onClick = {this.handleClick}>submit</button>
                    <div>{this.state.correct ? 'great work!' : ''}</div>
                </div>
        </div> );
    }
}
 
export default Main;