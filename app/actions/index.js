import { maxBy } from 'lodash';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import colors from '../util/colors';
import { Platform } from 'react-native';
import * as types from './types';

// List actions

export function changeFilterType({ filterType }) {
  return (dispatch, getState) => {
    dispatch(cleanTasks());
    dispatch({
      type: types.CHANGE_FILTER_TYPE,
      filterType,
    });
  };
}

// Task Actions

export function addTask({
  type = 'CURRENT',
  timestamp = moment().format(),
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

export function cancelNotification({ id }) {
  PushNotification.cancelLocalNotifications({ id });
}

export function changeTaskType({ id, type, animated = true }) {
  if (type === 'DEFERRED') return setDeferringTask({ id });
  if (type === 'CURRENT') cancelNotification({ id });
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
      const notification = {
        id: String(id),
        ticker: selectedTask.title,
        message: selectedTask.title,
        bigText: selectedTask.title,
        subText: 'Deferred Task',
        largeIcon: 'none',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        color: colors.BLUE,
        userInfo: {
          id: String(id),
        },
      };

      // Submit pr to stop this madness.
      if (Platform.OS === 'ios') {
        notification.date = moment(until).format('YYYY-MM-DDTHH:mm:ss.sssZ');
      } else if (Platform.OS === 'android') {
        notification.date = new Date(until);
      }

      PushNotification.localNotificationSchedule(notification);
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

export function cleanTasks() {
  return {
    type: types.CLEAN_TASKS,
  };
}

// Push Notification Actions

export function updatePermissions(permissions) {
  return {
    type: types.UPDATE_PERMISSIONS,
    ...permissions,
  };
}
