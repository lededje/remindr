import React from 'react';
import renderer from 'react-test-renderer';
import TaskList from './TaskList';

it('renders the task list component', () => {
  const taskData = [{
    id: 0,
    title: 'Test task 1',
    timestamp: 1,
  }, {
    id: 1,
    title: 'Test task 2',
    timestamp: 2,
  }];

  const component = renderer.create(
    <TaskList tasks={taskData} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders an empty list component with message', () => {
  const taskData = [];
  const component = renderer.create(
    <TaskList tasks={taskData} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
