import * as types from './actionTypes';

export function add(task) {
  return {
    type: types.ADD,
    task,
  };
}
