import * as types from './actionTypes';

export function add(task) {
  return {
    type: types.ADD,
    task,
  };
}

export function changeFilterType(filterType) {
  return {
    type: types.CHANGE_FILTER_TYPE,
    filterType,
  };
}
