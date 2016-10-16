import { maxBy } from 'lodash';
import moment from 'moment';
import { PushNotificationIOS } from 'react-native';

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
        deferring: false,
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

// Changes the task type, but if the type is deferred, it instead marks the task as deferred.
// The deferTask action handles changing the nextType in this instance.
export function changeNextTaskType(id, nextType) {
  if (nextType === 'DEFERRED') return setDeferringTask(id);

  const opts = {};

  if (nextType === 'CURRENT') {
    opts.deferredUntil = undefined;
    opts.completeTime = undefined;

    PushNotificationIOS.cancelLocalNotifications({ id });
  }

  if (nextType === 'DONE') {
    opts.completeTime = moment().format();
  }

  return {
    type: types.CHANGE_NEXT_TASK_TYPE,
    task: {
      id,
      nextType,
      ...opts,
    },
  };
}

export function removeTask(id) {
  return {
    type: types.REMOVE_TASK,
    id,
  };
}

export function setDeferringTask(id) {
  return {
    type: types.SET_DEFERRING_TASK,
    deferringTaskId: id,
  };
}

export function clearDeferringTask() {
  return {
    type: types.CLEAR_DEFERRING_TASK,
  };
}

export function deferTask(id, until) {
  return (dispatch, getState) => {
    const selectedTask = getState().tasks.tasks.find(task => task.id === id);

    if (until) {
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: moment(until).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        alertBody: selectedTask.title,
        sound: 'default',
        userInfo: { id },
      });
    }

    dispatch({
      type: types.DEFER_TASK,
      until,
      nextType: 'DEFERRED',
    });
  };
}

// Push Notification Actions

export function updatePermissions(permissions) {
  return {
    type: types.UPDATE_PERMISSIONS,
    ...permissions,
  };
}
