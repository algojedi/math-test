import React, { Component } from 'react';
import './main.css';
import Counter from '../../components/counter/counter';
import { MULTIPLY, ADD, SUBTRACT } from '../../components/constants'
import { auth, recordScore } from '../../firebase/firebase.utils';
import BackButton from '../../components/custom-button/back-button';
import CustomButton from './../../components/custom-button/custom-button.component';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  input : '',
                        gameInProgress: false, 
                        operator: props.operator,
                        gameEnded: false,
                        attempted: 0,
                        score: 0,
                        //level: props.level,
                        // topNum: topNumber,
                        // bottomNum: props.operator === SUBTRACT ?
                        //     //need to ensure bottomNum < topNum for subtraction
                        //     Math.floor(Math.random() * topNumber + 1) :
                        //     Math.floor(Math.random() * props.level + 1) };
                        topNum: 0,
                        bottomNum: 0,
                        errors: [] 
                    };
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
        // let newScore = answer === Number(this.state.input) ? 
        // this.state.score + 1 : this.state.score;
        
        //update score or track incorrect answers to display at end
        let newScore = this.state.score;
        let newErrors = [...this.state.errors];
        if (answer === Number(this.state.input)) {
            newScore++;
        } else {
            newErrors.push(
                `${this.state.topNum} ${this.state.operator} ${this.state.bottomNum} = ${this.state.input}`);
            }

        const topNumber = this.calcTopNum();
        this.setState({ attempted: this.state.attempted + 1,
                        score: newScore,
                        input: '',
                        topNum: topNumber,
                        bottomNum: this.calcBottomNum(topNumber),
                        errors: newErrors });
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
        const topNumber = this.calcTopNum();            
        this.setState({ 
            gameInProgress: true,
            topNum: topNumber,
            bottomNum: this.calcBottomNum(topNumber)
        })
    }
    timeOver = () => {
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
                console.log(this.state.errors);
    }

    //a function that gets called when counter is reset
    newCounter = () => {
        this.setState({
            input: '',
            gameInProgress: false,
            //operator: 'ADD',
            gameEnded: false,
            attempted: 0,
            score: 0,
            topNum: 0,
            bottomNum: 0,
            errors: []
        });
    }
    render() { 
        console.log('game ended?: ', this.state.gameEnded);
        const { topNum, bottomNum, score, attempted } = this.state;
        let endMsg = `final score is ${score} out of ${attempted}: ${(score*100/attempted).toFixed(1)}%`;
        return ( 
        
        <div className="main-container">
            <div className='main-back-btn' onClick={this.props.reset}>
                <BackButton />
                <span className='main-back-btn_back'>Back</span>
            </div>
            <div id='question-container'>
    
    
                    <div id="counter-wrapper">
                        <Counter    reset={this.newCounter}
                                    gameStarted={this.gameStarted}  
                                    timeEnd={this.timeOver}/>
                    </div>
    
                    <div id="question-wrapper">
                        <div id = 'top'>{topNum}</div>
                        <div id='bottom'>{this.state.operator + ' ' + bottomNum}</div>
                        <div id = 'guess-wrapper'>
                            <input  id='guess-field'
                                    ref={input => input && input.focus()} 
                                    value={this.state.input}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyPress}
                                    ></input>
                            <CustomButton id='answer-btn' onClick={this.handleClick}
                                isResetBtn='true'>Submit</CustomButton>
                                                
                            {/* <button id='answer-btn'
                                    onClick = {this.handleClick}>Submit</button> */}
                        </div>
                        <div id='game-end-message'>{this.state.gameEnded ? 
                        endMsg : ''}</div>
                    </div>
                    
            </div> 
            <ul className='error-list'>
                {this.state.gameEnded ? 
                (<> <h3>Your Errors</h3>
                    {this.state.errors.map(error => <li>{error}</li>)}</>) : null }

            </ul>
        </div> )
    }
}
 
export default Main;