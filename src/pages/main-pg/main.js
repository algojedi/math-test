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
        //console.log('game ended?: ', this.state.gameEnded);
        const { topNum, bottomNum, score, attempted } = this.state;
        let endMsg = `Final score is ${score} out of ${attempted}: ${(score*100/attempted).toFixed(1)}%`;
        return ( 
        <React.Fragment>
        <div className='main-back-btn' onClick={this.props.reset}>
            <BackButton />
            <span className='main-back-btn_back'>Back</span>
        </div>
        <div className="main-container">
            <div className="timer-wrapper">
                <Counter    reset={this.newCounter}
                            gameStarted={this.gameStarted}  
                            timeEnd={this.timeOver}/>
            </div>
            <div className='question-wrapper'>
                <div className="question-set">
                    <div className= 'top-question-num'>{topNum}</div>
                    <div className='question-operator'>{this.state.operator}</div>
                    <div className='bottom-question-num'>{bottomNum}</div>
                </div>
                
                <input className='answer-input-field'
                        ref={input => input && input.focus()} 
                        value={this.state.input}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyPress}
                        ></input>
                <CustomButton  onClick={this.handleClick}
                        // isResetBtn='true' className='answer-btn'
                        >Submit</CustomButton>
            </div>                        
                    
            <div className='game-end-message'>{this.state.gameEnded ? 
                    endMsg : ''}</div>
        </div>    
        <ul className='error-list'>
                {this.state.gameEnded && this.state.errors.length > 0 ? 
            (<> <h3 className='errors-title'>Your Errors</h3>
                {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}</>) : null }

        </ul>
         </React.Fragment>)
    }
}
 
export default Main;