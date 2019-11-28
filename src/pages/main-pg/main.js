import React, { Component } from 'react';
import './main.css';
import Counter from '../../components/counter/counter';
import { MULTIPLY, ADD, SUBTRACT } from '../../components/constants'
import { auth, recordScore } from '../../firebase/firebase.utils';
import BackButton from '../../components/custom-button/back-button';


class Main extends Component {
    
    constructor(props) {
        super(props);
        const topNumber = this.calcTopNum();
        this.state = {  input : '',
                        gameInProgress: false, 
                        operator: props.operator,
                        gameEnded: false,
                        attempted: 0,
                        score: 0,
                        //level: props.level,
                        topNum: topNumber,
                        bottomNum: props.operator === SUBTRACT ?
                            //need to ensure bottomNum < topNum for subtraction
                            Math.floor(Math.random() * topNumber + 1) :
                            Math.floor(Math.random() * props.level + 1) };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.timeOver = this.timeOver.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        if (!this.state.gameInProgress) { return };
        let answer;
        switch (this.state.operator) {
            case ADD:
                answer = this.state.topNum + this.state.bottomNum;
                break;
            // case DIVIDE:
            //     answer = this.state.topNum / this.state.bottomNum;
            //     break;
            case SUBTRACT:
                answer = this.state.topNum - this.state.bottomNum;
                break;
            case MULTIPLY:
                answer = this.state.topNum * this.state.bottomNum;
                break;
            default:
                break;
        }
        let newScore = answer === Number(this.state.input) ? this.state.score + 1 : this.state.score;
        
        const topNumber = this.calcTopNum();
        this.setState({ attempted: this.state.attempted + 1,
                        score: newScore,
                        input: '',
                        topNum: topNumber,
                        bottomNum: this.calcBottomNum(topNumber) });

    }
    calcTopNum() {
        return Math.floor(Math.random() * this.props.level + 1);
    }
    calcBottomNum(tn) {
        //ensure result is not a negative number by comparing to top number tn
        return this.state.operator === SUBTRACT ?
            Math.floor(Math.random() * tn + 1) :
            Math.floor(Math.random() * this.props.level + 1);
    }
    handleChange(e) {
        this.setState({ input : e.target.value})
    }

    handleKeyPress = e => {
        if (e.keyCode === 13) this.handleClick(e);
    }
    gameStarted = () => {
        this.setState({ gameInProgress: true })
    }
    async timeOver() {
        const { score, attempted, operator } = this.state;
        const { level } = this.props;
        console.log(`final score is ${score} out of ${attempted}`);
        this.setState({ gameEnded: true, gameInProgress : false });
        const user = auth.currentUser;
        if (!user) { //score does not get saved unless signed in
            return;
        }
        
        setTimeout(() => { 
            recordScore(user, { score, attempted, operator, level } 
                
        )}, 500);

    }

    //a function that gets called when counter is reset
    newCounter = () => {
        const topNumber = this.calcTopNum();
        this.setState({
            input: '',
            gameInProgress: false,
            //operator: 'ADD',
            gameEnded: false,
            attempted: 0,
            score: 0,
            topNum: topNumber,
            bottomNum: this.calcBottomNum(topNumber)
        });
    }
    render() { 
        
        const { topNum, bottomNum, score, attempted } = this.state;
        let endMsg = `final score is ${score} out of ${attempted}: ${(score*100/attempted).toFixed(1)}%`;
        return ( 
        
        <div id='q-container'>

                <div className='main-back-btn' onClick={this.props.reset}>
                    <BackButton />Reselect
                </div>

                <div id="counter-wrapper">
                    <Counter    reset={this.newCounter}
                                gameStarted={this.gameStarted}  
                                timeEnd={this.timeOver}/>
                </div>

                <div id="question-wrapper">
                    <div id = 'top'>{topNum}</div>
                    <div id='bottom'>{this.state.operator + ' ' + bottomNum}</div>
                    <div id = 'guess-wrapper'>
                        <input  id='guess'
                                ref={input => input && input.focus()} 
                                value={this.state.input}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyPress}
                                ></input>
                        <button id='answer-btn'
                                onClick = {this.handleClick}>Submit</button>

                    </div>
                    <div id='game-end-message'>{this.state.gameEnded ? 
                    endMsg : ''}</div>
                </div>
        </div> );
    }
}
 
export default Main;