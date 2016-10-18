import moment from 'moment';
import * as types from '../actions/types';

const initialState = {
  filterType: 'CURRENT',
  tasks: [{
    id: 0,
    title: 'Create a new task',
    timestamp: moment().format(),
    type: 'CURRENT',
    deferring: false,
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

    case types.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id),
      };

    case types.STOP_ANIMATING:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              isAnimating: false,
            };
          }
          return task;
        }),
      };

    case types.CHANGE_TASK_TYPE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              type: action.task.type,
              isAnimating: action.task.isAnimating,
            };
          }
          return task;
        }),
      };

    case types.SET_DEFERRING_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              deferring: true,
            };
          }
          return task;
        }),
      };

    case types.CLEAR_DEFERRING_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => ({
          ...task,
          deferring: false,
        })),
      };

    case types.DEFER_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.deferring) {
            return {
              ...task,
              deferredUntil: action.until,
              type: 'DEFERRED',
              deferring: false,
              isAnimating: action.isAnimating,
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
