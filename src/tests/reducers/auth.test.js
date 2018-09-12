import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'ler875'
  }
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});


test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid:'ker875'},action);
  expect(state).toEqual({});
});