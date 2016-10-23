import deepFreeze from 'deep-freeze';
import reducer from './taskReducer';
import * as types from '../actions/types';

describe('Task Reducer', () => {
  it('has a default state', () => {
    const state = {};
    const action = {};
    const result = {};

    deepFreeze(state);
    expect(reducer(state, action)).toEqual(result);
  });

  it('adds a task', () => {
    const state = {
      tasks: [],
    };
    const action = {
      type: types.ADD_TASK,
      task: {
        id: 1,
        title: 'For the tests',
        timestamp: '2016-10-14T18:47:57+01:00',
      },
    };
    const result = {
      tasks: [{
        id: 1,
        title: 'For the tests',
        timestamp: '2016-10-14T18:47:57+01:00',
      }],
    };

    expect(reducer(state, action)).toEqual(result);
  });

  it('removes a task', () => {
    const state = {
      tasks: [{
        id: 1,
      }],
    };
    const action = {
      type: types.REMOVE_TASK,
      id: 1,
    };
    const result = {
      tasks: [],
    };

    expect(reducer(state, action)).toEqual(result);
  });

  it('changes task types without changing others', () => {
    const state = {
      tasks: [{
        id: 1,
        type: 'CURRENT',
      }, {
        id: 2,
        type: 'CURRENT',
      }],
    };
    const action = {
      type: types.CHANGE_TASK_TYPE,
      task: {
        id: 1,
        type: 'DELETED',
      },
    };
    const result = {
      tasks: [{
        id: 1,
        type: 'DELETED',
      }, {
        id: 2,
        type: 'CURRENT',
      }],
    };

    expect(reducer(state, action)).toEqual(result);
  });

  it('changes the current filter type', () => {
    const state = {
      filterType: 'ONE',
    };
    const action = {
      type: types.CHANGE_FILTER_TYPE,
      filterType: 'TWO',
    };
    const result = {
      filterType: 'TWO',
    };

    expect(reducer(state, action)).toEqual(result);
  });

  describe('Clean Tasks', () => {
    const action = {
      type: types.CLEAN_TASKS,
    };

    it('removes deleted tasks', () => {
      const state = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
        }, {
          id: 2,
          type: 'DELETED',
        }],
      };
      const result = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
        }],
      };

      expect(reducer(state, action)).toEqual(result);
    });

    it('removes deferred times off of tasks that are no longer deferred', () => {
      const state = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
          deferredUntil: '2016-10-14T18:47:57+01:00',
        }, {
          id: 2,
          type: 'DEFERRED',
          deferredUntil: '2016-10-14T18:47:57+01:00',
        }],
      };
      const result = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
        }, {
          id: 2,
          type: 'DEFERRED',
          deferredUntil: '2016-10-14T18:47:57+01:00',
        }],
      };

      expect(reducer(state, action)).toEqual(result);
    });

    it('removes completed times off of tasks that are no longer done', () => {
      const state = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
          completedAt: '2016-10-14T18:47:57+01:00',
        }, {
          id: 2,
          type: 'DONE',
          completedAt: '2016-10-14T18:47:57+01:00',
        }],
      };
      const result = {
        tasks: [{
          id: 1,
          type: 'CURRENT',
        }, {
          id: 2,
          type: 'DONE',
          completedAt: '2016-10-14T18:47:57+01:00',
        }],
      };

      expect(reducer(state, action)).toEqual(result);
    });
  });
});
