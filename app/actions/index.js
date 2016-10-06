import { maxBy } from 'lodash';
import * as types from './types';
// List actions

export function changeFilterType(filterType) {
  return (dispatch) => {
    dispatch(squashTasks());
    dispatch({
      type: types.CHANGE_FILTER_TYPE,
      filterType,
    });
  };
}

// Task Actions

export function addTask({
  type = 'CURRENT',
  timestamp = Date.now(),
  title,
}) {
  return (dispatch, getState) => {
    const { tasks } = getState().tasks;
    const maxTask = maxBy(tasks, task => task.id);
    const maxTaskId = maxTask && maxTask.id && maxTask.id + 1;
    const id = maxTaskId || 1;

    dispatch({
      type: types.ADD_TASK,
      task: {
        id,
        type,
        timestamp,
        title,
      },
    });
  };
}

export function squashTasks() {
  return {
    type: types.SQUASH_TASKS,
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

export function changeNextTaskType(id, nextType) {
  return {
    type: types.CHANGE_NEXT_TASK_TYPE,
    id,
    nextType,
  };
}

export function removeTask(id) {
  return {
    type: types.REMOVE_TASK,
    id,
  };
}
