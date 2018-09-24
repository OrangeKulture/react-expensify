import {startAddExpense, addExpense, editExpense, 
removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'testuid123';
const defaultAuthState = {auth: {uid} };

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());;
});


test('should set up remove expense action object', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});


test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snap) => {
    expect(snap.val()).toBeFalsy();
    done();
  });
});


test('should set up edit expense action object', () => {
  const result = editExpense('obj1',{
    description: 'New description',
    amount: 1500
  });
  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'obj1',
    updates: {
      description: 'New description',
      amount: 1500
    }
  })
});


test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {amount: 21045};
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  })
})



test('should setup add expense action obj with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {description: "mouse", amount: 3000, note: "some note", createdAt: 1000}

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  })
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {description: "", amount:0, note:"", createdAt: 0}
  
  store.dispatch(startAddExpense(expenseDefaults)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  })
});

test('should setup set expense action with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});