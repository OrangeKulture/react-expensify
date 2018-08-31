import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() }
  wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense}/>);
});

test('should render the component correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should handle editing when passing in an expense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense.id, expense);
  expect(history).toHaveBeenLastCalledWith()
})