import firebase from 'firebase/app';
import 'firebase/firestore';  
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFGPypWQYLiw9uDglIofOAV8s-sP4atmo",
  authDomain: "think-piece-59669.firebaseapp.com",
  projectId: "think-piece-59669",
  storageBucket: "think-piece-59669.appspot.com",
  messagingSenderId: "355115319672",
  appId: "1:355115319672:web:e55ac0dcbbdc6bd694088d",
  measurementId: "G-F15Q4CXL4Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setting now defaults to true
// firestore.settings({ timestampsInSnapshots: true });

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase;

export const createUserDocument = async (user, additionalData) => {
  // If there is no user, let's not do this.
  if (!user) return;

  // Get a reference to the location (the place) in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch a document from that location.
  const snapshot = await userRef.get();

  // If there isn't a document for that user. Let's use information
  // that we got from either Google or our sign up form.
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  // Consigue el documento y devuélvelo, ya que es lo que probablemente querremos hacer a continuación.
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};

export default firebase;
