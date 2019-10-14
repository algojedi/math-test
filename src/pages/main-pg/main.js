import React, { Component } from 'react';
import './main.css';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  input : '',
                        correct : false,
                        topNum: Math.floor(Math.random() * 101 + 1),
                        bottomNum : Math.floor(Math.random() * 101 + 1)  };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleClick(e) {
        e.preventDefault();
        const answer = this.state.topNum + this.state.bottomNum;
        let isCorrect;
        answer === Number(this.state.input) ? isCorrect = true : isCorrect = false;
        
        this.setState({ correct : isCorrect,
                        input: '' })
        
    }

    handleChange(e) {
        this.setState({ input : e.target.value})
    }

    render() { 
        let top = this.state.topNum;
        let bottom = this.state.bottomNum;


        return ( 
        
        <div id='q-container'>
        
                <div id = 'top'>{top}</div>
                <div id = 'bottom'>{'+ ' + bottom}</div>
                <div id = 'guess-wrapper'>
                    <input  id='guess'
                            value={this.state.input}
                            onChange={this.handleChange}
                            ></input>
                    <button id='answer-btn'
                            onClick = {this.handleClick}>submit</button>
                    <div>{this.state.correct ? 'great work!' : ''}</div>
                </div>
        </div> );
    }
}
 
export default Main;