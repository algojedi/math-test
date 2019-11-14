import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCq_00wBlQPzvJAjUPUMBJATvnT-TEy5Uo",
    authDomain: "math-db.firebaseapp.com",
    databaseURL: "https://math-db.firebaseio.com",
    projectId: "math-db",
    storageBucket: "",
    messagingSenderId: "189383719049",
    appId: "1:189383719049:web:c9e0344a98ec69a4c8ae58",
    measurementId: "G-XJ1LDSL2R0"
};

firebase.initializeApp(config);

//userAuth will be the user object returned by Firebase during signin
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //create user if none exists
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const recordScore = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const { uid } = userAuth;
    const { score, attempted, operator, level } = additionalData;
    const createdAt = new Date();
    try {
        
        firestore.collection('scores').doc(uid)
            .collection('history').doc(createdAt.getTime().toString()).set({
            createdAt,
            score, 
            attempted,
            operator,
            level
        })
        
    } catch (error) {
        console.log('error entering score', error.message);
      }
    //return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
