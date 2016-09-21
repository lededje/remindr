import deepFreeze from 'deep-freeze';
import reducer, { initialState } from './taskReducer';
import * as types from '../actions/actionTypes';

describe('Task Reducer', () => {
  deepFreeze(initialState);

  it('has a default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('adds a task', () => {
    const action = {
      type: types.ADD,
      task: {
        id: 1,
        title: 'For the tests',
        timestamp: 0,
      },
    };

    const result = {
      ...initialState,
      tasks: [
        ...initialState.tasks,
        { ...action.task },
      ],
    };

    expect(reducer(initialState, action)).toEqual(result);
  });
});
