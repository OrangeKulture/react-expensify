import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

// ------------------------------------------------------- //

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

// ------------------------------------------------------- //

test('should remove expense by id', () => {
  const action = {
    type:  'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

// ------------------------------------------------------- //

test('should not remove expense if id is not found', () => {
  const action = {
    type:  'REMOVE_EXPENSE',
    id: '25'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// ------------------------------------------------------- //

test('should add expense', () => {
  const expense =   {
    id: '4',
    description: 'Beers',
    note: '',
    amount: 1500,
    createdAt: moment(0).add(6, 'days').valueOf()
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses,action.expense]);
});

// ------------------------------------------------------- //

test('should edit an expense', () => {
  const updates = { note: 'My New Note' }
  const action = { 
    type: 'EDIT_EXPENSE', 
    id: expenses[2].id,
    updates
  }
  const state = expensesReducer(expenses, action);
  expect(state[2].note).toBe('My New Note');
})

// ------------------------------------------------------- //

test('should not edit an expense id the id is not found', () => {
  const updates = { amount: 285000 }
  const action = { 
    type: 'EDIT_EXPENSE', 
    id: '510',
    updates
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
})


test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
})
