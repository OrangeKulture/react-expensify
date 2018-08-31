import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, otherFilters} from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters} 
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
});


test('should render component correctly', () => {
  expect(wrapper).toMatchSnapshot();
})


test('should render component with otherFilters in place', () => {
  wrapper.setProps({filters: otherFilters});
  expect(wrapper).toMatchSnapshot();
});


test('should handle text change', () => {
  const value = 'rent (test-text 1)'
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});


test('should handle sortByDate', () => {
  const value = 'date';
  wrapper.setProps({filters: otherFilters});
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled();
});


test('should handle sortByAmount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByAmount).toHaveBeenCalled();
});


test('should handle date changes', () => {
  const startDate = 2500;
  const endDate = 9000;
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});