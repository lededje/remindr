import * as types from '../actions/types';

const initialState = {
  filterType: 'CURRENT',
  tasks: [{
    id: 0,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
  }, {
    id: 2,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
  }, {
    id: 3,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
  }, {
    id: 4,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
  }, {
    id: 5,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
  }, {
    id: 6,
    title: 'Create a new task',
    timestamp: 0,
    type: 'CURRENT',
    nextType: '',
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
          if (task.id === action.id) {
            return {
              ...task,
              nextType: action.nextType,
            };
          }
          return task;
        }),
      };

    default:
      return state;
  }
}
