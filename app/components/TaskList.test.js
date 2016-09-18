import React from 'react';
import TaskList from './TaskList';
import renderer from 'react-test-renderer';

const taskData = [{
  id: 0,
  title: 'Test task 1',
  timestamp: 1,
}, {
  id: 1,
  title: 'Test task 2',
  timestamp: 2,
}];

it('renders the task list component', () => {
  const component = renderer.create(
    <TaskList tasks={taskData} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
