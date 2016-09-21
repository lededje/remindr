import * as types from './types';

// List actions

export function changeFilterType(filterType) {
  return {
    type: types.CHANGE_FILTER_TYPE,
    filterType,
  };
}

// Task Actions

export function addTask(task) {
  return {
    type: types.ADD_TASK,
    task,
  };
}


export function changeTaskType(id, type) {
  return {
    type: types.CHANGE_TASK_TYPE,
    task: {
      id,
      type,
    },
  };
}

export function removeTask(id) {
  return {
    type: types.REMOVE_TASK,
    id,
  };
}
