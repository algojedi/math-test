import React from 'react';
import { auth, firestore } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';

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
                    const { attempted, score, createdAt } = record.data();
                    userHistory.push({
                        attempted,
                        score,
                        createdAt
                    });
                })
                this.setState({ userHistory, renderedStats: true });
            })
            .catch(error => {
                console.log('could not retrieve from database', error);
            })

        setTimeout(() => { console.log('state length: ', this.state.length) }, 500);


    }
    
    render() {
        if (!auth.currentUser) {
            return (<div> Please sign in</div>);
        }
        const user = auth.currentUser;
        const { email, displayName, uid } = user;
        
        if (!this.state.renderedStats) { //a condition to prevent infinite loop
            this.fetchHistory();
        }

        return ( 
            <div>
                <Link to='/main'>Back to main page</Link>
                <h1>Account Details</h1>
                <p>{email}</p>
                <p>{'display name: ' + displayName }</p>
                <p>{uid}</p>
                <h2>Previous Scores</h2>
                {this.state.userHistory.length ? this.state.userHistory.map(record => <p>{record.score}</p>) : ''}

                <CustomButton   isStopBtn={true} 
                                large={true}
                                onClick={() => {
                                    user.delete().then(function () {
                                        // User deleted.
                                    }).catch(function (error) {
                                        console.log(error);
                                        alert('Please sign out and sign in again. This operation requires recent authentication');
                                    });
                                }}> DELETE </CustomButton>
            </div>
        );
    }
}
 
export default Account;