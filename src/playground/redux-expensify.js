import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// --- Actions --- //

// ADD_EXPENSE
const addExpense = ({ description='', note='', amount=0, createdAt=0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});


// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


// --- Filters --- //

// SET_TEXT
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT',
  text
});


// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});


// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});


// SET_START_DATE
const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});

// SET_END_DATE
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});

// Creating Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
}



// Creating Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state;
  }
}




// Get visible expenses -- Filtering

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate } ) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });
};




// Store creation

// const store = createStore(expensesReducer);
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);



store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  amount: 1000,
  createdAt: -20125
}))

const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee',
  amount: 3000,
  createdAt: -1000
}));


// store.dispatch(removeExpense({
//     id: expenseOne.expense.id
// }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('tro'));
// store.dispatch(setTextFilter());


// store.dispatch(sortByDate());

// store.dispatch(sortByAmount());


// store.dispatch(setStartDate(125));

// store.dispatch(setEndDate(1250));


const demoState = {
  expenses:[
    {
      id: 'fwefwef',
      description: 'January Rent',
      note: 'This is a placeholder',
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}

// const user = {
//   name: 'Jorge',
//   age: 35
// }

// console.log({
//   ...user
// });