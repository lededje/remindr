import deepFreeze from 'deep-freeze';
import reducer from './pushReducer';
import * as types from '../actions/types';

describe('Push Reducer', () => {
  it('has a default state', () => {
    const state = {};
    const action = {
      type: types.UPDATE_PERMISSIONS,
      alert: true,
      badge: false,
      sound: true,
    };
    const result = {
      alert: true,
      badge: false,
      sound: true,
    };

    deepFreeze(state);
    expect(reducer(state, action)).toEqual(result);
  });
});
