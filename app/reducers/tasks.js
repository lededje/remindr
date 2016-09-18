import * as types from '../actions/actionTypes';

const initialState = [{
  id: 0,
  title: 'Create a new task',
  timestamp: Date.now(),
}];

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD:
    default:
      return state;
  }
}
