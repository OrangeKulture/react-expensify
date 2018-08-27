import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup addExpense action obj with provided values', () => {
  const data = {
    description: 'Rent',
    amount: 150000,
    createdAt: 1000,
    note: 'Last month rent'
  };
  const action = addExpense(data);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...data,
      id: expect.any(String)
    }
  })
});


test('should setup addExpense action obj with default values', () => {
  const result = addExpense();
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description:'', 
      note:'', 
      amount:0, 
      createdAt:0
    }
  });
});


test('should set up remove expense action object', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
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