import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';


test('should render component correctly with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render component correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={15} expensesTotal={8500553} />);
  expect(wrapper).toMatchSnapshot();
});