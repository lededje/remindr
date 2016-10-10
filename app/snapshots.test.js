import React from 'react';
import renderer from 'react-test-renderer';

import taskTypes from './util/taskTypes';

import AddTaskInput from './components/AddTaskInput';
import Navigation from './components/Navigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Task from './components/Task';

describe('Component snapshots', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <AddTaskInput />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the navigation component', () => {
    const dummyPressCallback = () => '';
    const component = renderer.create(
      <Navigation selectedType={'CURRENT'} onPress={dummyPressCallback} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the header component', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the task list component', () => {
    const taskData = [{
      id: 0,
      title: 'Test task 1',
      timestamp: '2016-10-14T18:47:57Z',
    }, {
      id: 1,
      title: 'Test task 2',
      timestamp: '2016-10-14T18:47:57Z',
    }];

    const component = renderer.create(
      <TaskList tasks={taskData} left={taskTypes.DEFERRED} right={taskTypes.DONE} />
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

  it('renders a current task component', () => {
    const component = renderer.create(
      <Task
        id={123}
        type={'CURRENT'}
        title="Current Task"
        timestamp={'2016-10-14T18:47:57Z'}
        left={taskTypes.DEFERRED}
        right={taskTypes.DONE}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a deferred task component', () => {
    const component = renderer.create(
      <Task
        id={123}
        type={'DEFERRED'}
        title="Current Task"
        timestamp={'2016-10-14T18:47:57Z'}
        deferredUntil={'2016-10-14T18:47:57Z'}
        right={taskTypes.CURRENT}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a done task component', () => {
    const component = renderer.create(
      <Task
        id={123}
        type={'DONE'}
        title="Current Task"
        timestamp={'2016-10-14T18:47:57Z'}
        left={taskTypes.CURRENT}
        right={taskTypes.DELETE}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
