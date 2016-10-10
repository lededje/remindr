import moment from 'moment';
import * as types from '../actions/types';

const initialState = {
  filterType: 'CURRENT',
  tasks: [{
    id: 0,
    title: 'Create a new task',
    timestamp: moment().format(),
    type: 'CURRENT',
    nextType: '',
    deferring: false,
  }],
};

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {

    // "Squash" tasks that were deferred but are no longer.
    case types.SQUASH_TASKS:
      return {
        ...state,
        tasks: state.tasks.map(task => ({
          ...task,
          type: task.nextType || task.type,
          nextType: undefined,
        })),
      };

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

    case types.CHANGE_TASK_TYPE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              type: action.task.type,
            };
          }
          return task;
        }),
      };

    case types.CHANGE_NEXT_TASK_TYPE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              ...action.task,
            };
          }
          return task;
        }),
      };

    case types.SET_DEFERRING_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.deferringTaskId) {
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
              nextType: action.nextType,
              deferredUntil: action.until,
              deferring: false,
            };
          }
          return task;
        }),
      };

    default:
      return state;
  }
}
