import * as types from '../actions/actionTypes';

const initialState = [];

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD:
    default:
      return state;
  }
}
