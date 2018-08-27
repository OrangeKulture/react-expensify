import {createStore} from 'redux';


//--- Action Generators ---//


// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });


const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = () => ({
  type: 'RESET'
})

const setCount = ({ count }) => ({
  type: 'SET',
  count
})

//--- Reducers ---//

const countReducer = (state = {count: 0}, action)=>{
  switch (action.type){
    case 'INCREMENT': 
    // const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
    return {
    // count: state.count + incrementBy
    count: state.count + action.incrementBy
    };
    case 'DECREMENT':
    // const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : 1;
    return {
      count: state.count - action.decrementBy
    };
    case 'SET':
    return {
      count: action.count
    };
    case 'RESET':
    return {
      count: 0
    }
    default:
      return state;
  }
}


//--- Store Creation ---//

const store = createStore(countReducer);



store.subscribe(() => {
  console.log(store.getState());
});


// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

// store.dispatch({
//   type: 'RESET'
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 523
// });

// store.dispatch({
//   type: 'DECREMENT'
// });

// store.dispatch({
//   type: 'SET',
//   count: 55
// });


store.dispatch(incrementCount());

store.dispatch(incrementCount({ incrementBy: 25}));

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 11}));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 78 }));





