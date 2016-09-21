import * as types from './types';
import * as actions from './';

describe('actions', () => {
  it('it should create an action to change the filter type', () => {
    const args = ['TEST'];
    const result = {
      type: types.CHANGE_FILTER_TYPE,
      filterType: 'TEST',
    };

    expect(actions.changeFilterType.apply(null, args)).toEqual(result);
  });

  it('it should create an action to add a task', () => {
    const args = [{
      id: 1,
    }];
    const result = {
      type: types.ADD_TASK,
      task: {
        id: 1,
      },
    };

    expect(actions.addTask.apply(null, args)).toEqual(result);
  });
});
