import * as types from '../actions/types';

const initialState = {
  alert: false,
  badge: false,
  sound: false,
};

export default function tasks(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PERMISSIONS:
      return {
        ...initialState,
        alert: action.alert,
        badge: action.badge,
        sound: action.sound,
      };
    default:
      return state;
  }
}
