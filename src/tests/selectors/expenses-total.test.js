import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 with no expense passed in', () => {
  const result = getExpensesTotal([]);
  expect(result).toBe(0);
})

test('should correctly display amount for multiple expenses', () => {
  const result = getExpensesTotal(expenses);
  expect(result).toBe(114195);
});

test('should correctly display amount for a single expense', () => {
  const result = getExpensesTotal([expenses[2]]);
  expect(result).toBe(expenses[2].amount);
});

