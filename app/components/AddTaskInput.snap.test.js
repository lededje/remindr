import React from 'react';
import renderer from 'react-test-renderer';

import AddTaskInput from './AddTaskInput';

describe('Add Task Input', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <AddTaskInput />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
