import React, { Component } from 'react';
import { View, StyleSheet, PushNotificationIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';
import autobind from 'autobind-decorator';

import * as actions from '../actions';
import { flow as taskFlow } from '../util/taskTypes';

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTaskInput from '../components/AddTaskInput';
import Navigation from '../components/Navigation';
import DeferDialog from '../components/DeferDialog';

@connect(
  state => ({
    tasks: state.tasks,
    push: state.push,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)
export default class RemindrApp extends Component {

  static propTypes = {
    tasks: React.PropTypes.shape({
      tasks: React.PropTypes.array.isRequired,
      filterType: React.PropTypes.string.isRequired,
    }).isRequired,
    push: React.PropTypes.shape(),
    actions: React.PropTypes.shape().isRequired,
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('localNotification', this.onPushLocalNotification);
    PushNotificationIOS.requestPermissions().then(this.props.actions.updatePermissions);
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('localNotification', this.onPushLocalNotification);
  }

  @autobind
  askPermission() {
    PushNotificationIOS.requestPermissions({ alert: true, badge: true, sound: true })
      .then(this.props.actions.updatePermissions);
  }

  @autobind
  onPushLocalNotification(notification) {
    this.props.actions.squashTasks();
  }

  render() {
    let deferringTask;
    const filteredTasks =
      this.props.tasks.tasks.filter(task => task.type === this.props.tasks.filterType);
    const isTaskDeferring = findIndex(filteredTasks, task => task.deferring) >= 0;
    const currentTaskFlowId = findIndex(taskFlow, flow => flow.id === this.props.tasks.filterType);

    if (isTaskDeferring) {
      deferringTask = filteredTasks.find(task => task.deferring);
    }

    return (
      <View style={styles.container}>
        {isTaskDeferring && (
          <DeferDialog
            onClose={this.props.actions.clearDeferringTask}
            onTimeChosen={this.props.actions.deferTask}
            task={deferringTask}
          />
        )}
        <Header />
        <TaskList
          tasks={filteredTasks}
          onSwipe={this.props.actions.changeNextTaskType}
          onClose={this.props.actions.squashTask}
          left={taskFlow[currentTaskFlowId - 1]}
          right={taskFlow[currentTaskFlowId + 1]}
        />
        <AddTaskInput onSubmit={this.props.actions.addTask} />
        <Navigation
          onPress={this.props.actions.changeFilterType}
          selectedType={this.props.tasks.filterType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
