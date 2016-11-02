import React, { Component } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';
import PushNotification from 'react-native-push-notification';
import autobind from 'autobind-decorator';
import moment from 'moment';

import * as actions from '../actions';
import taskTypes, { flow as taskFlow } from '../util/taskTypes';

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
    PushNotification.configure({
      onRegister: this.props.actions.updatePermissions,
      onNotification: this.onPushLocalNotification,
      requestPermissions: false,
    });

    this.localNotificationListener = DeviceEventEmitter.addListener('localNotification', this.onPushLocalNotification);

    this.askPermission();
  }

  componentWillUnmount() {
    this.localNotificationListener.remove();
  }

  @autobind
  askPermission() {
    PushNotification.requestPermissions();
  }

  @autobind
  onPushLocalNotification(notification) {
    this.props.actions.changeTaskType({ type: 'CURRENT', id: parseInt(notification.id, 10) });
  }

  filterAndSortTasks() {
    const filteredTasks =
      this.props.tasks.tasks.filter(task =>
        task.type === this.props.tasks.filterType || task.isAnimating
      );
    const sortedTasks = filteredTasks.sort((taskA, taskB) => {
      const sortBy = taskTypes[this.props.tasks.filterType].sortBy;
      if (sortBy) {
        return moment(taskA[sortBy]).isBefore(taskB[sortBy]);
      }
      return true;
    });

    if (taskTypes[this.props.tasks.filterType].order === 'asc') {
      sortedTasks.reverse();
    }

    return sortedTasks;
  }

  render() {
    let deferringTask;

    const tasks = this.filterAndSortTasks();
    const isTaskDeferring = findIndex(tasks, task => task.deferring) >= 0;
    const currentTaskFlowId = findIndex(taskFlow, flow => flow.id === this.props.tasks.filterType);

    if (isTaskDeferring) {
      deferringTask = tasks.find(task => task.deferring);
    }

    return (
      <View style={styles.container}>
        <Header />
        <TaskList
          tasks={tasks}
          onSwipe={this.props.actions.changeTaskType}
          onClose={this.props.actions.stopAnimating}
          left={taskFlow[currentTaskFlowId - 1]}
          right={taskFlow[currentTaskFlowId + 1]}
        />
        {this.props.tasks.filterType === 'CURRENT' && <AddTaskInput onSubmit={this.props.actions.addTask} />}
        <Navigation
          onPress={this.props.actions.changeFilterType}
          selectedType={this.props.tasks.filterType}
        />
        {isTaskDeferring && <DeferDialog
          onClose={this.props.actions.clearDeferringTask}
          onTimeChosen={this.props.actions.deferTask}
          task={deferringTask}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
