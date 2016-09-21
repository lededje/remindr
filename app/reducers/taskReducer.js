import * as types from '../actions/actionTypes';

export const initialState = {
  filterType: 'CURRENT',
  tasks: [{
    id: 0,
    title: 'Create a new task',
    timestamp: 0,
  }],
};

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_FILTER_TYPE:
      return {
        ...state,
        filterType: action.filterType,
      };
    case types.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.task },
        ],
      };
    default:
      return state;
  }
}
