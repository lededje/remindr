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
        timestamp: 0,
      },
    };
    const result = {
      tasks: [{
        id: 1,
        title: 'For the tests',
        timestamp: 0,
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

  it('changes task types', () => {
    const state = {
      tasks: [{
        id: 1,
        type: 'CURRENT',
      }],
    };
    const action = {
      type: types.CHANGE_TASK_TYPE,
      task: {
        id: 1,
        type: 'DONE',
      },
    };
    const result = {
      tasks: [{
        id: 1,
        type: 'DONE',
      }],
    };

    expect(reducer(state, action)).toEqual(result);
  });
});
