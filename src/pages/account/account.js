import React from 'react';
import { auth, firestore } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import './account.css';
import { EASY, MEDIUM, HARD } from '../../components/constants';

class Account extends React.Component {

    constructor() {
        super();
        this.state = { userHistory : [], renderedStats : false };
    }

    fetchHistory = async () => {
        const userHistory = [];
        await firestore.collection(`/scores/${auth.currentUser.uid}/history`).get()
            .then(qs => {
                qs.docs.forEach(record => {
                    const { attempted, score, createdAt, operator, level } = record.data();
                    userHistory.push({
                        attempted,
                        score,
                        createdAt,
                        operator,
                        level
                    });
                })
                this.setState({ userHistory, renderedStats: true });
            })
            .catch(error => {
                console.log('could not retrieve from database', error);
            })
    }
    
    convertLevel(levelNumber) {
        switch (levelNumber) {
            case EASY: return 'Easy';
            case MEDIUM: return 'Medium';
            case HARD: return 'Hard';
            default:
                return 'unrecognized level';
        }
    }
    opTranslate(operation) {
        switch (operation) {
            case "\u002B": return 'Add';
            case "\u2212": return 'Subtr';
            case "\u00D7": return 'Mult';
            default:
                return 'unrecognized operation';
        }
    }
    parseDate(fullDate) {
        let stringDate = fullDate.toDate().toDateString();
        let arrDate = stringDate.split(' ');
        //splice to remove day of the week from array
        let parsedDate = arrDate.splice(1);
        return parsedDate.join(' ');

    }
    render() {
        if (!auth.currentUser) {
            return (<div className='please-sign-in'> Please sign in to view account</div>);
        }
        const user = auth.currentUser;
        const { email, displayName } = user;
        
        if (!this.state.renderedStats) { //a condition to prevent infinite loop
            this.fetchHistory();
        }
        let maxScore = 0;
        let maxDate = ''; //date of max score
        //let maxOp = ''; //operation of max score
        let emptyTableMsg = 'Please play to see scores';

        

        return ( 
            <div className='account-wrapper'>
               
                <h1>Account Details</h1>
                <p>{'Email: ' + email}</p>
                <p>{displayName ? `Display Name: ${displayName}` : '' }</p>
                

                <h2 className='table-title'>Previous Scores</h2>
                <table className='scores-table'><tbody className='table-wrapper'>
                    <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Attempts</th>
                        <th>Pct</th>
                        <th>Operation</th>
                        <th>Difficulty</th>
                    </tr>
                {/* reverse userHistory in order populate table w most recent on top*/}
                {this.state.userHistory.length ? this.state.userHistory.reverse().map(record => {
                    
                    if ( record.score > maxScore) {
                        maxScore = record.score;
                        maxDate = record.createdAt.toDate().toDateString();
                    }
                    return (
                        
                            <tr key={record.createdAt}>
                                <td>{this.parseDate(record.createdAt)}</td>
                                <td>{record.score}</td>
                                <td>{record.attempted}</td>
                                <td>{(record.score*100 / record.attempted).toFixed(2)}</td>
                                <td>{this.opTranslate(record.operator)}</td>
                                <td>{this.convertLevel(record.level)}</td>
                            </tr>
                        )
                }):null}
                </tbody>
                </table>
                <p className='max-score-msg'>{this.state.userHistory.length ?
                    `Max score of ${maxScore} on ${maxDate}` : emptyTableMsg}</p>

                <CustomButton   style={{marginTop: 250}}
                                isStopBtn={true} 
                                large={true}
                                onClick={() => {
                                    user.delete().then(function () {
                                        // User deleted.
                                    }).catch(function (error) {
                                        console.log(error);
                                        alert('Please sign out and sign in again. This operation requires recent authentication');
                                    });
                    }}> DELETE ACCOUNT <i className="fa fa-trash-o" style={{fontSize: 20}}></i>
                </CustomButton>
            </div>
        );
    }
}
 
export default Account;