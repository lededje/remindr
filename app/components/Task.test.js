import React from 'react';
import Task from './Task';
import renderer from 'react-test-renderer';

it('should include all necessary props', () => {
  const component = renderer.create(
    <Task id={123} title="Test Task" timestamp={1474160934141} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
