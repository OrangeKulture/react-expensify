import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCsHW2REmIBU8QS3EGosDJdgpHbwjuc6s4",
  authDomain: "demoexpense-93f08.firebaseapp.com",
  databaseURL: "https://demoexpense-93f08.firebaseio.com",
  projectId: "demoexpense-93f08",
  storageBucket: "demoexpense-93f08.appspot.com",
  messagingSenderId: "1061886358392"
};

firebase.initializeApp(config);
const database = firebase.database();

export {firebase, database as default};