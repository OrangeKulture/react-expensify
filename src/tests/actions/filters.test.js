import moment from 'moment';
import {setTextFilter, sortByDate, sortByAmount,setStartDate, setEndDate} from '../../actions/filters';

test('should set start date action', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
});

test('should set end date action', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
});

test('should set a text action object when passing a string', () => {
  const filter = setTextFilter('rent');
  expect(filter).toEqual({
    type: 'SET_TEXT',
    text: expect.any(String)
  });
});

test('should set a text action object and clear when passing empty string', () => {
  const filter = setTextFilter();
  expect(filter).toEqual({
    type: 'SET_TEXT',
    text: ''
  });
});

test('should set sort by date action object', () => {
  expect(sortByDate()).toEqual({type: 'SORT_BY_DATE'});
})

test('should set sort by amount action object', () => {
  expect(sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'});
})