import React, { Component } from 'react';
import './main.css';
import Counter from '../../components/counter/counter';
import { EASY, MULTIPLY, DIVIDE, ADD, SUBTRACT } from '../../components/constants'
import { auth, recordScore, firestore } from '../../firebase/firebase.utils';

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
                        topNum: topNumber,
                        bottomNum: props.operator === SUBTRACT ?
                            Math.floor(Math.random() * topNumber + 1) :
                            Math.floor(Math.random() * EASY + 1) };
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
            case DIVIDE:
                answer = this.state.topNum / this.state.bottomNum;
                break;
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

        //check running score
        setTimeout(() => { console.log('current score: ' + this.state.score); }, 500);
    }
    calcTopNum() {
        return Math.floor(Math.random() * EASY + 1);
    }
    calcBottomNum(tn) {
        //ensure result is not a negative number by comparing to top number tn
        return this.state.operator === SUBTRACT ?
            Math.floor(Math.random() * tn + 1) :
            Math.floor(Math.random() * EASY + 1);
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
        const { score, attempted } = this.state;

        console.log(`final score is ${score} out of ${attempted}`);
        this.setState({ gameEnded: true, gameInProgress : false });
        const user = auth.currentUser;
        if (!user) { //data does not record unless signed in
            return;
        }
        const snapshot = await firestore.collection(`/scores/${user.uid}/history`).get();
        //DO SOMETHING WITH SNAPSHOT INFO
        console.log( snapshot.docs.map(doc => doc.data()) );
        setTimeout(() => { 
            recordScore(user, { score, attempted } 
                
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
        console.log('and the operator in main render is ', this.state.operator);
        const user = auth.currentUser;
        //let name; let email; let uid;
        if (user != null) {
            // name = user.displayName;
            // email = user.email;
            // uid = user.uid;  
            const { name, email, uid } = user;
            console.log('user info');
            console.log(name, email, uid);
        }
        
        
        const { topNum, bottomNum, score, attempted } = this.state;
        let endMsg = `final score is ${score} out of ${attempted}: ${(score*100/attempted).toFixed(1)}%`;
        return ( 
        
        <div id='q-container'>
        
                <div id="counter-wrapper">
                    <Counter    reset={this.newCounter}
                                gameStarted={this.gameStarted}  
                                timeEnd={this.timeOver}/>
                </div>

                <div id="question-wrapper">
                    <div id = 'top'>{topNum}</div>
                    <div id = 'bottom'>{this.state.operator + ' ' + bottomNum}</div>
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
                </div>
        </div> );
    }
}
 
export default Main;