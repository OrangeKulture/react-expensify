import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

const item1 = store.dispatch(addExpense({
  description: 'Water Bill',
  amount: 5000,
  createdAt: 5865405
}));


const item2 = store.dispatch(addExpense({
  description: 'Gas Bill',
  amount: 8000,
  createdAt: 12500
}));


store.dispatch(addExpense({
  description: 'Rent',
  amount: '109500'
}));


const state = store.getState();
const visible = getVisibleExpenses(state.expenses, state.filters);
// console.log(visible);


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)


ReactDOM.render(jsx, document.getElementById('app'));