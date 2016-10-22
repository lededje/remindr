import { maxBy } from 'lodash';
import moment from 'moment';
import { PushNotificationIOS } from 'react-native';

import * as types from './types';

// List actions

export function changeFilterType({ filterType }) {
  return {
    type: types.CHANGE_FILTER_TYPE,
    filterType,
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

export function changeTaskType({ id, type, animated = true }) {
  if (type === 'DEFERRED') return setDeferringTask({ id });
  return {
    type: types.CHANGE_TASK_TYPE,
    task: {
      id,
      type,
      isAnimating: animated,
    },
  };
}

export function removeTask({ id }) {
  return {
    type: types.REMOVE_TASK,
    id,
  };
}

export function setDeferringTask({ id }) {
  return {
    type: types.SET_DEFERRING_TASK,
    id,
  };
}

export function clearDeferringTask() {
  return {
    type: types.CLEAR_DEFERRING_TASK,
  };
}

export function deferTask({ id, until, animated = true }) {
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
      id,
      until,
      isAnimating: animated,
    });
  };
}

export function stopAnimating({ id }) {
  return {
    type: types.STOP_ANIMATING,
    id,
  };
}

// Push Notification Actions

export function updatePermissions(permissions) {
  return {
    type: types.UPDATE_PERMISSIONS,
    ...permissions,
  };
}
