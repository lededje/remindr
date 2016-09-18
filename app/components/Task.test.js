import React from 'react';
import Task from './Task';
import renderer from 'react-test-renderer';

it('renders the task component', () => {
  const component = renderer.create(
    <Task id={123} title="Test Task" timestamp={1474160934141} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
