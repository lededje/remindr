import * as types from '../actions/actionTypes';

const initialState = {
  filterType: 'CURRENT',
  tasks: [{
    id: 0,
    title: 'Create a new task',
    timestamp: Date.now(),
  }],
};

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_FILTER_TYPE:
      return {
        ...state,
        filterType: action.filterType,
      };
    default:
      return state;
  }
}
