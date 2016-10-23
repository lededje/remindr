import moment from 'moment';
import * as types from '../actions/types';
import { compact } from 'lodash';

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
            let completedAt;

            if (action.task.type === 'DONE') {
              completedAt = moment().format();
            }

            return {
              ...task,
              type: action.task.type,
              isAnimating: action.task.isAnimating,
              completedAt,
            };
          }
          return task;
        }),
      };

    case types.CLEAN_TASKS:
      return {
        ...state,
        tasks: compact(state.tasks.map((task) => {
          const newTask = {
            ...task,
          };

          switch (task.type) {
            case 'DEFERRED':
              newTask.completedAt = undefined;
              break;
            case 'CURRENT':
              newTask.completedAt = undefined;
              newTask.deferredUntil = undefined;
              break;
            case 'DONE':
              newTask.deferredUntil = undefined;
              break;
            case 'DELETED':
              return undefined;
            default:
              break;
          }

          return newTask;
        })),
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
