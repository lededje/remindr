import React from 'react';
import renderer from 'react-test-renderer';
import mockdate from 'mockdate';
import taskTypes from './util/taskTypes';

import AddTaskInput from './components/AddTaskInput';
import Navigation from './components/Navigation';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Task from './components/Task';

const _getTimezoneOffset = Date.prototype.getTimezoneOffset;

describe('Component snapshots', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = () => 0;
    mockdate.set('2015-10-21T16:29:00Z');
  });

  afterEach(() => {
    mockdate.reset();
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = _getTimezoneOffset;
  });

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
      <Navigation selectedType="CURRENT" onPress={dummyPressCallback} />
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
      timestamp: '2015-10-21T17:29:00Z',
      type: 'CURRENT',
    }, {
      id: 1,
      title: 'Test task 2',
      timestamp: '2015-10-21T17:29:00Z',
      type: 'CURRENT',
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

  // Calendar time causes this to use Date.now to calculate result so breaks

  it('renders a current task component', () => {
    const component = renderer.create(
      <Task
        id={123}
        type="CURRENT"
        title="Current Task"
        timestamp="2015-10-21T17:29:00Z"
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
        type="DEFERRED"
        title="Current Task"
        timestamp="2015-10-21T17:29:00Z"
        deferredUntil="2015-10-22T17:29:00Z"
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
        type="DONE"
        title="Current Task"
        timestamp="2015-10-21T17:29:00Z"
        left={taskTypes.CURRENT}
        right={taskTypes.DELETE}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
