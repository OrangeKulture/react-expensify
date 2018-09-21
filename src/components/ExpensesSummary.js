import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
  const word = expenseCount === 1 ? 'expense' : 'expenses';
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {word} totaling <span>{numeral(expensesTotal / 100).format('$0,0.00')}</span></h1>
        <div className="page-header__actions">
          <Link className="button-main" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
}

export default connect(mapStateToProps)(ExpensesSummary);