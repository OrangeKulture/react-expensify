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


database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
})

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
})

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
})



// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((child) => {
//     expenses.push({
//       id: child.key,
//       ...child.val()
//     })
//   })
//   console.log(expenses);
// })

// const expenses = [
//   {
//     description: 'Rent',
//     amount: 85000,
//     note: '',
//     createdAt: 1258568
//   },
//   {
//     description: 'Gas',
//     amount: 2000,
//     note: 'this month\'s gas',
//     createdAt: 125856124
//   },
//   {
//     description: 'Food',
//     amount: 6000,
//     note: '',
//     createdAt: 12587210
//   }
// ]

// database.ref('expenses').push(expenses[0]);
// database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);

// database.ref().once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   }).catch((error) => {
//     console.log(error);
//   });


// database.ref().on('value', (snapshot) => {
//   const person = snapshot.val();
//   console.log(`${person.name} is a ${person.job.title} and works at ${person.job.company}`)
// })


// firebase.database().ref().set({
//   name: 'Jorge'
// })

// database.ref().set({
//   name: 'Jorge'
// })

// database.ref('attributes').set({
//     height: 179,
//     weight: 69
// }).then(() => {
//   console.log('All done!');
// }).catch((error) => {
//   console.log('Something went wrong', error)
// });


// database.ref().set({
//   name: 'Jorge',
//   age: 35,
//   isSingle: false,
//   location: {
//     city: 'Heredia',
//     country: 'Costa Rica'
//   }
// }).then(() => {
//   console.log(done);
// }).catch((error) => {
//   console.error(error);
// });


// database.ref().remove()
//   .then(() => {
//     console.log('done');
//   }).catch((error) => {
//     console.error(error);
//   });
