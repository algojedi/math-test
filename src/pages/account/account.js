import React from 'react';
import { auth, firestore } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';
import './account.css';
import { EASY, MEDIUM, HARD } from '../../components/constants';

class Account extends React.Component {

    constructor() {
        super();
        this.state = { userHistory : [], renderedStats : false };
    }

    fetchHistory = () => {
        const userHistory = [];

        firestore.collection(`/scores/${auth.currentUser.uid}/history`).get()
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
        //console.log("x" == operation);
        switch (operation) {
            case "\u002B": return 'Addition';
            case "\u2212": return 'Subtraction';
            case "\u00D7": return 'Multiplication';
            default:
                return 'unrecognized operation';
        }
    }
    render() {
        if (!auth.currentUser) {
            return (<div className='please-sign-in'> Please sign in to view account</div>);
        }
        const user = auth.currentUser;
        const { email, displayName, uid } = user;
        
        if (!this.state.renderedStats) { //a condition to prevent infinite loop
            this.fetchHistory();
        }

        return ( 
            <div className='account-wrapper'>
                <Link className='return-link' to='/main'>
                    <i className="fa fa-arrow-circle-left" style={{ fontSize: 24 }}></i>
                </Link>
                <h1>Account Details</h1>
                <p>{'Email: ' + email}</p>
                <p>{displayName ? `Display Name: ${displayName}` : '' }</p>
                

                <h2>Previous Scores</h2>
                <table className='scores-table'><tbody className='table-wrapper'>
                    <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Attempts</th>
                        <th>% Score</th>
                        <th>Operation</th>
                        <th>Difficulty</th>
                    </tr>

                {/* reverse userHistory in order populate table w most recent on top*/}
                {this.state.userHistory.length ? this.state.userHistory.reverse().map(record => {
                    console.log('recod is ', record);
                    return (
                        <>
                            <tr>
                                <td>{record.createdAt.toDate().toDateString()}</td>
                                <td>{record.score}</td>
                                <td>{record.attempted}</td>
                                <td>{(record.score*100 / record.attempted).toFixed(2)}</td>
                                <td>{this.opTranslate(record.operator)}</td>
                                <td>{this.convertLevel(record.level)}</td>
                            </tr>
                        </>)
                }) : ''}
                    
                </tbody></table>

                <CustomButton   style={{marginTop: 250}}
                                isStopBtn={true} 
                                large={true}
                                // className='delete-btn'
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