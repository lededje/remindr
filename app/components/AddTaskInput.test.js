import 'react-native-mock/mock';

import React from 'react';
import { shallow } from 'enzyme';

import AddTaskInput from './AddTaskInput';

describe('Add Task Input', () => {
  it('resets the state value of the input back to an empty string on submit', () => {
    const wrapper = shallow(
      <AddTaskInput onSubmit={jest.fn()} />
    );

    wrapper.setState({
      text: 'This is not an empty string.',
    });

    wrapper.instance().onSubmit();

    expect(wrapper.state().text).toEqual('');
  });
});
