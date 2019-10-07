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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;