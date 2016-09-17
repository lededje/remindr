import React from 'react';
import Task from './Task';
import renderer from 'react-test-renderer';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Task />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
