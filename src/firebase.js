import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPfXSgiUGz-b9gBNG9LjnLqd-fFaUP0S0",
    authDomain: "infinite-scrolling-51b23.firebaseapp.com",
    projectId: "infinite-scrolling-51b23",
    storageBucket: "infinite-scrolling-51b23.appspot.com",
    messagingSenderId: "950594343639",
    appId: "1:950594343639:web:459a032f20f27369d31692",
    measurementId: "G-ETYTNX02RG"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();   //to access firebase database
  

  export {db};