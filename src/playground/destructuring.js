// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin',
//     year: 2001
//   }
// }

// const {name: publisherName = 'Self Published'} = book.publisher;

// if(publisherName){
//   console.log(publisherName);
// }


const address = ['1299 s Juniper St', 'Philadelphia', 'Pennsylvania', '19147'];
const [street, city, state, zipcode] = address;

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [bev,,medPrice] = item;

console.log(`A ${bev} costs ${medPrice}`);


