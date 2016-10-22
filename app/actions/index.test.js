jest.mock('react-native', () => (
  {
    PushNotificationIOS: {
      scheduleLocalNotification: jest.fn(),
    },
  }
));

import * as types from './types';
import * as actions from './';

describe('actions', () => {
  it('should create an action to change the filter type', () => {
    const args = { filterType: 'TEST' };
    const changeFilterResult = {
      type: types.CHANGE_FILTER_TYPE,
      filterType: 'TEST',
    };

    expect(actions.changeFilterType.call(null, args)).toEqual(changeFilterResult);
  });

  it('should create an action to add a task', () => {
    const args = [{
      id: 1,
      title: 'Task Two',
      timestamp: 0,
    }];
    const state = {
      tasks: {
        tasks: [{
          id: 1,
        }],
      },
    };
    const result = {
      type: types.ADD_TASK,
      task: {
        id: 2,
        type: 'CURRENT',
        timestamp: 0,
        title: 'Task Two',
        deferring: false,
      },
    };

    actions.addTask.apply(null, args)((test) => {
      expect(test).toEqual(result);
    }, () => state);
  });

  it('should create an action if there are not other tasks to increment from', () => {
    const args = [{
      id: 1,
      title: 'Only task',
      timestamp: 0,
    }];
    const state = {
      tasks: {
        tasks: [],
      },
    };
    const result = {
      type: types.ADD_TASK,
      task: {
        id: 1,
        type: 'CURRENT',
        timestamp: 0,
        title: 'Only task',
        deferring: false,
      },
    };

    actions.addTask.apply(null, args)((test) => {
      expect(test).toEqual(result);
    }, () => state);
  });

  it('should create an action to change a task type', () => {
    const args = { id: 1, type: 'TEST' };
    const result = {
      type: types.CHANGE_TASK_TYPE,
      task: {
        id: 1,
        type: 'TEST',
        isAnimating: true,
      },
    };

    expect(actions.changeTaskType.call(null, args)).toEqual(result);
  });

  it('should create an action to remove a task', () => {
    const args = { id: 1 };
    const result = {
      type: types.REMOVE_TASK,
      id: 1,
    };

    expect(actions.removeTask.call(null, args)).toEqual(result);
  });

  it('should create an action to defer a task', () => {
    const args = { id: 1 };
    const result = {
      type: types.SET_DEFERRING_TASK,
      id: 1,
    };

    expect(actions.setDeferringTask(args)).toEqual(result);
  });

  it('should create an action to clear all deferring tasks', () => {
    const result = {
      type: types.CLEAR_DEFERRING_TASK,
    };

    expect(actions.clearDeferringTask()).toEqual(result);
  });


  it('should create an action to mark a tasks animation state as stopeed', () => {
    const args = { id: 1 };
    const result = {
      type: types.STOP_ANIMATING,
      id: 1,
    };

    expect(actions.stopAnimating(args)).toEqual(result);
  });

  it('should create an action to update push permissions with all args', () => {
    const args = { alert: 1, lorem: 2, ipsum: 3 };
    const result = {
      type: types.UPDATE_PERMISSIONS,
      ...args,
    };

    expect(actions.updatePermissions(args)).toEqual(result);
  });

  describe('defer task', () => {
    const state = {
      tasks: {
        tasks: [
          {
            id: 1,
            title: 'Test task',
          },
        ],
      },
    };

    it('should create an action to defer a task', () => {
      const args = { id: 1, until: undefined, animated: true };
      const result = {
        type: types.DEFER_TASK,
        id: 1,
        until: undefined,
        isAnimating: true,
      };

      actions.deferTask(args)((test) => {
        expect(test).toEqual(result);
      }, () => state);
    });

    it('should queue a push notification when you defer a task', () => {
      const args = { id: 1, until: 1476470877000 };
      const sheduleMock = require.requireMock('react-native').PushNotificationIOS.scheduleLocalNotification;

      actions.deferTask(args)((test) => {
        expect(sheduleMock).toHaveBeenCalledWith({
          fireDate: '2016-10-14T19:47:57.5757+01:00',
          alertBody: 'Test task',
          sound: 'default',
          userInfo: { id: 1 },
        });
      }, () => state);
    });
  });
});
